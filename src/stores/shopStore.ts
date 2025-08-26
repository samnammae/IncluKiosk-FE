import { create } from "zustand";
export interface chooseShopType {
  storeId: number;
  name: string;
  address: string;
  phone: string;
  mainImg: string;
  createdAt: string;
  updatedAt: string;
}

interface shopStore {
  name: string;
  introduction: string;
  titleImg: string;
  logoimg: string;
  startBackground: string;
  setName: (value: string) => void;
  setIntroduction: (value: string) => void;
  setTitleImg: (value: string) => void;
  setLogoImg: (value: string) => void;
  setStartBackground: (value: string) => void;
}

export const useShopStore = create<shopStore>((set) => ({
  name: "",
  introduction: "",
  titleImg: "",
  logoimg: "",
  startBackground: "",
  setName: (value) => set({ name: value }),
  setIntroduction: (value) => set({ introduction: value }),
  setTitleImg: (value) => set({ titleImg: value }),
  setLogoImg: (value) => set({ logoimg: value }),
  setStartBackground: (value) => set({ startBackground: value }),
}));
