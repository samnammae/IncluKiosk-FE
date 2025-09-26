import { create } from "zustand";

interface SocketState {
  socket: WebSocket | null;
  connect: () => void;
  sendMessage: (msg: string) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  //소켓 연결
  connect: () => {
    if (get().socket) return; // 이미 연결되어 있으면 무시

    const ws = new WebSocket("ws://localhost:8765");
    ws.onopen = () => console.log("소켓 연결됨");
    ws.onclose = () => {
      console.log("소켓 끊김");
      set({ socket: null });
    };

    set({ socket: ws });
  },

  //메세지 보내기
  sendMessage: (msg: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      console.log("보낸 메시지:", msg);
    } else {
      console.warn("소켓이 연결되지 않았습니다.");
    }
  },
}));
