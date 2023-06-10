import type { AppProps } from 'next/app';
import { global } from 'src/styles/global';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  global();
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
