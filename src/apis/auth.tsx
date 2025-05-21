import { api } from './api';

export interface JoinFormType {
  email: string;
  password: string;
  name: string;
  phone: string;
}
export interface LoginFormType {
  email: string;
  password: string;
}

export const authAPI = {
  login: async (data: LoginFormType) => {
    const response = await api.post('/auth/login', data);
    console.log(data);
    localStorage.setItem('accessToken', response.data.data.accessToken);
    return response.data;
  },
  join: async (data: JoinFormType) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
};
