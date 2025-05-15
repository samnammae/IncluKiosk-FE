import { create } from 'zustand';
interface brandStore {
  name: string;
  introduction: string;
  titleImg: string;
  logoimg: string;
  setName: (value: string) => void;
  setIntroduction: (value: string) => void;
  setTitleImg: (value: string) => void;
  setLogoImg: (value: string) => void;
}

export const useBrandStore = create<brandStore>((set) => ({
  name: '',
  introduction: '',
  titleImg: '',
  logoimg: '',
  setName: (value) => set({ name: value }),
  setIntroduction: (value) => set({ introduction: value }),
  setTitleImg: (value) => set({ titleImg: value }),
  setLogoImg: (value) => set({ logoimg: value }),
}));
