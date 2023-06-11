import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCookie, deleteCookie, setCookie, hasCookie } from 'cookies-next';
import axios from '../services/axios';
import { useRouter } from 'next/router';

type User = {
  name: string;
};

type UserSignIn = {
  email: string;
  password: string;
};

type UserSignUp = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  login: (user: UserSignIn) => Promise<void>;
  logout: () => void;
  signUp: (user: UserSignUp) => Promise<{ status: number }>;
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = getCookie('skyifsp_access_token') as string;

    if (token) {
      axios.get<User>('user/me').then((response) => setUser(response.data));
    }
  }, []);

  const login = async (user: UserSignIn) => {
    const { data } = await axios.post('/auth/login', user);

    setCookie('skyifsp_access_token', data.access_token);

    router.reload();
  };

  const signUp = async (user: UserSignUp) => {
    const { status } = await axios.post('user', user);

    return {
      status,
    };
  };

  const logout = () => {
    try {
      deleteCookie('skyifsp_access_token');
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
