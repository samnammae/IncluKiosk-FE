import { create } from 'zustand';
interface brandStore {
  name: string;
  introduction: string;
  img: string;
  setName: (value: string) => void;
  setIntroduction: (value: string) => void;
  setImg: (value: string) => void;
}

export const useBrandStore = create<brandStore>((set) => ({
  name: '',
  introduction: '',
  img: '',

  setName: (value) => set({ name: value }),
  setIntroduction: (value) => set({ introduction: value }),
  setImg: (value) => set({ img: value }),
}));
