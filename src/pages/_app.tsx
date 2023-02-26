import { FC, useEffect, useState, useMemo } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import cn from 'classnames';
import globalStore from '@/stores/globalStore';
import { Loader, ThemeToggle, WalletModalButton, WalletMultiButton } from '@/components';
import { localStorageProp } from '@/constants/localStorage';
import { AppState } from '@/types/stores';
import { Roboto, Roboto_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import styles from '@/styles/App.module.scss';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-robotomono',
});

globalStore.subscribe(() => {
  const { dark } = globalStore.getState();
  // Save dark theme preference to localStorage
  localStorage.setItem(localStorageProp, JSON.stringify({ dark }));
});

const InternalApp: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const dark = useSelector((state: AppState) => state.dark);
  const appLoading = useSelector((state: AppState) => state.appLoading);
  const [initLoading, setInitLoading] = useState(true);

  const { publicKey } = useWallet();

  useEffect(() => {
    const { dark: darkFromLocalStorage } = JSON.parse(
      localStorage.getItem(localStorageProp) || '{}',
    );
    if (darkFromLocalStorage !== undefined) {
      dispatch({ type: 'CHANGE_MODE', dark: darkFromLocalStorage });
    }
    setInitLoading(false);
  }, [dispatch]);

  return (
    <div
      className={cn([
        roboto.variable,
        robotoMono.variable,
        'font-sans',
        styles.app,
        dark && 'dark',
      ])}
    >
      <main className={cn([styles.main, initLoading && styles.loading])}>
        <ThemeToggle
          checked={dark}
          onToggle={() => {
            dispatch({ type: 'CHANGE_MODE', dark: !dark });
          }}
          className={styles.toggle}
        />
        {!publicKey ? (
          <WalletModalButton />
        ) : (
          <>
            <div className={styles.wallet}>
              <WalletMultiButton />
            </div>
            <Component {...pageProps} />
          </>
        )}
        {appLoading ? <Loader /> : null}
      </main>
    </div>
  );
};

const App: FC<AppProps> = (props) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );

  return (
    <Provider store={globalStore}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <InternalApp {...props} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Provider>
  );
};

export default App;
