import type { AppProps } from "next/app";
import { global } from "src/styles/global";

export default function App({ Component, pageProps }: AppProps) {
  global();
  return <Component {...pageProps} />;
}
