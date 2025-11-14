import { create } from "zustand";

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
    localStorage.setItem("canUseEye", "true");
  },

  resetTimer: () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      set({ isLocked: true });
    }, INACTIVITY_TIMEOUT);
  },
}));
