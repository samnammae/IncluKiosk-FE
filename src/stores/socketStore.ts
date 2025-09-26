import { create } from "zustand";
export interface SocketMessage {
  type: string;
  message?: string;
}
interface SocketState {
  socket: WebSocket | null;

  connect: () => void;
  sendMessage: (msg: SocketMessage) => void;
  setOnMessage: (handler: ((msg: SocketMessage) => void) | null) => void;
  onMessageHandler: ((msg: SocketMessage) => void) | null;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onMessageHandler: null,

  // 소켓 연결
  connect: () => {
    if (get().socket) return; // 이미 연결되어 있으면 무시

    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      console.log("소켓 연결됨");
      set({ socket: ws });
    };

    ws.onmessage = (event) => {
      try {
        const data: SocketMessage = JSON.parse(event.data); // JSON 파싱
        console.log("받은 메시지:", data);
        const handler = get().onMessageHandler;
        if (handler) handler(data); // 등록된 핸들러 실행
      } catch (err) {
        console.error("메시지 파싱 실패:", event.data);
      }
    };

    ws.onclose = () => {
      console.log("소켓 끊김");
      set({ socket: null });
    };

    set({ socket: ws });
  },

  // 메시지 보내기
  sendMessage: (msg: SocketMessage) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg)); // 객체 → JSON 변환
      console.log("보낸 메시지:", msg);
    } else {
      console.warn("소켓이 연결되지 않았습니다.");
    }
  },

  // 메시지 핸들러 등록
  setOnMessage: (handler) => {
    set({ onMessageHandler: handler });
  },
}));
