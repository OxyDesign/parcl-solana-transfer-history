import { FC, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import cn from 'classnames';
import globalStore from '@/stores/globalStore';
import { ThemeToggle } from '@/components';
import { localStorageProp } from '@/constants/localStorage';
import { AppState } from '@/types/stores';
import '@/styles/globals.css';
import styles from '@/styles/App.module.scss';

globalStore.subscribe(() => {
  const { dark } = globalStore.getState();
  // Save dark theme preference to localStorage
  localStorage.setItem(localStorageProp, JSON.stringify({ dark }));
});

const _App: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const dark = useSelector((state: AppState) => state.dark);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { dark } = JSON.parse(localStorage.getItem(localStorageProp) || '{}');
    if (dark !== undefined) {
      dispatch({ type: 'CHANGE_MODE', dark });
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <div className={cn([styles.app, dark && 'dark'])}>
      <main className={cn([styles.main, loading && styles.loading])}>
        <ThemeToggle
          checked={dark}
          onToggle={() => {
            dispatch({ type: 'CHANGE_MODE', dark: !dark });
          }}
        />
        <Component {...pageProps} />
      </main>
    </div>
  );
};

const App: FC<AppProps> = (props) => {
  return (
    <Provider store={globalStore}>
      <_App {...props} />
    </Provider>
  );
};

export default App;
