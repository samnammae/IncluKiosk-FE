import { create } from 'zustand';
interface brandStore {
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

export const useBrandStore = create<brandStore>((set) => ({
  name: '',
  introduction: '',
  titleImg: '',
  logoimg: '',
  startBackground: '',
  setName: (value) => set({ name: value }),
  setIntroduction: (value) => set({ introduction: value }),
  setTitleImg: (value) => set({ titleImg: value }),
  setLogoImg: (value) => set({ logoimg: value }),
  setStartBackground: (value) => set({ startBackground: value }),
}));
