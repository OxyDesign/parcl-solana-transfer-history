import { FC } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { ThemeToggleProps } from './ThemeToggle.types';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: FC<ThemeToggleProps> = ({ checked, onToggle, ...props }) => {
  return (
    <label className={styles.root}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={() => {
          onToggle();
        }}
        {...props}
      />
      <SunIcon className={styles.icon} />
      <div className={styles.toggle} />
      <MoonIcon className={styles.icon} />
    </label>
  );
};
