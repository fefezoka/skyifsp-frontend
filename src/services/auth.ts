import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';

export const TOKEN_KEY = 'skyifsp-token';
export const isAuthenticated = () => hasCookie(TOKEN_KEY);
export const getToken = () => getCookie(TOKEN_KEY);
export const login = (token: string) => {
  setCookie(TOKEN_KEY, token);
};
export const logout = () => {
  deleteCookie(TOKEN_KEY);
};
