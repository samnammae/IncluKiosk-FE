import { create } from "zustand";

export interface SocketMessage {
  type: string;
  message?: string;
}

interface SocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  retryCount: number;
  maxRetries: number;

  connect: () => void;
  sendMessage: (msg: SocketMessage) => void;
  addOnMessage: (handler: (msg: SocketMessage) => void) => void;
  removeOnMessage: (handler: (msg: SocketMessage) => void) => void;
  handlers: ((msg: SocketMessage) => void)[];
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  retryCount: 0,
  maxRetries: 3, //최대 재시도 횟수
  handlers: [],

  connect: () => {
    const { socket, retryCount, maxRetries } = get();
    if (socket || retryCount >= maxRetries) {
      if (retryCount >= maxRetries) {
        console.warn("소켓 연결 시도 횟수 초과");
      }
      return;
    }

    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      console.log("소켓 연결됨");
      set({ socket: ws, isConnected: true, retryCount: 0 });
    };

    ws.onmessage = (event) => {
      const { handlers } = get();
      try {
        const msg = JSON.parse(event.data);
        handlers.forEach((h) => h(msg));
      } catch (_) {}
    };

    ws.onerror = (err) => {
      console.error("소켓 에러:", err);
    };

    ws.onclose = () => {
      console.log("소켓 연결 종료");
      set({ socket: null, isConnected: false });

      const { retryCount, maxRetries } = get();
      if (retryCount < maxRetries) {
        const next = retryCount + 1;
        set({ retryCount: next });
        console.log(`재시도 ${next}/${maxRetries}...`);

        setTimeout(() => get().connect(), 2000);
      } else {
        console.warn("재시도 한도 초과, 연결 중단");
      }
    };

    set({ socket: ws });
  },

  sendMessage: (msg: SocketMessage) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
      console.log("보낸 메시지:", msg);
    } else {
      console.warn("소켓이 연결되지 않았습니다.");
    }
  },

  addOnMessage: (handler) =>
    set((state) => ({ handlers: [...state.handlers, handler] })),

  removeOnMessage: (handler) =>
    set((state) => ({
      handlers: state.handlers.filter((h) => h !== handler),
    })),
}));

if (typeof window !== "undefined") {
  (window as any).sendMessage = (msg: SocketMessage) => {
    const handlers = useSocketStore.getState().handlers;
    if (!handlers.length) {
      console.warn("onMessageHandler가 아직 설정되지 않았습니다.");
      return;
    }
    console.log("sendMessage 호출됨:", msg);
    handlers.forEach((h) => h(msg));
  };
}
