import { FC, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import cn from 'classnames';
import globalStore from '@/stores/globalStore';
import { ThemeToggle } from '@/components';
import { localStorageProp } from '@/constants/localStorage';
import { AppState } from '@/types/stores';
import { Roboto, Roboto_Mono } from 'next/font/google';
import '@/styles/globals.css';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { dark: darkFromLocalStorage } = JSON.parse(
      localStorage.getItem(localStorageProp) || '{}',
    );
    if (darkFromLocalStorage !== undefined) {
      dispatch({ type: 'CHANGE_MODE', dark: darkFromLocalStorage });
    }
    setLoading(false);
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
      <main className={cn([styles.main, loading && styles.loading])}>
        <ThemeToggle
          checked={dark}
          onToggle={() => {
            dispatch({ type: 'CHANGE_MODE', dark: !dark });
          }}
          className={styles.toggle}
        />
        <Component {...pageProps} />
      </main>
    </div>
  );
};

const App: FC<AppProps> = (props) => (
  <Provider store={globalStore}>
    <InternalApp {...props} />
  </Provider>
);

export default App;
