import { create } from "zustand";
interface EyeTrackingStoreType {
  canUseEye: boolean;
  setCanUseEye: (value: boolean) => void;
}
export const useEyeTrackingStore = create<EyeTrackingStoreType>((set) => ({
  canUseEye: true,
  setCanUseEye: (value: boolean) => set({ canUseEye: value }),
}));
