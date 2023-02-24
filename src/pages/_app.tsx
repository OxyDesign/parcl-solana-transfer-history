import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import globalStore from '@/stores/globalStore';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={globalStore}>
    <Component {...pageProps} />
  </Provider>;
}
