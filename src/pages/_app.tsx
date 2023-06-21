import type { AppProps } from 'next/app';
import { global } from 'src/styles/global';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from '../styles';

export default function App({ Component, pageProps }: AppProps) {
  global();

  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
