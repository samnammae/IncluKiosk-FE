import { create } from "zustand";
import { useEyeTrackingStore } from "./eyeTrackingStore";

interface LockStore {
  isLocked: boolean;
  setLocked: (locked: boolean) => void;
  resetTimer: () => void;
}

export const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 3분
// export const INACTIVITY_TIMEOUT = 5 * 1000; // 5초
let timer: NodeJS.Timeout | null = null;

export const useLockStore = create<LockStore>((set) => ({
  isLocked: false,

  setLocked: (locked: boolean) => {
    set({ isLocked: locked });
    useEyeTrackingStore.getState().setCanUseEye(true); //아이트래킹 변수 초기화
  },

  resetTimer: () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      set({ isLocked: true });
    }, INACTIVITY_TIMEOUT);
  },
}));
