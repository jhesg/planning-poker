import type { AppProps } from "next/app";
import "@/css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
