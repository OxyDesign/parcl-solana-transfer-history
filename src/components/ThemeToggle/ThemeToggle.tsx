import { FC } from 'react';
import cn from 'classnames';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { ThemeToggleProps } from './ThemeToggle.types';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: FC<ThemeToggleProps> = ({ checked, className, onToggle, ...props }) => (
  <label className={cn(styles.root, className)} htmlFor="toggle-checkbox">
    <input
      type="checkbox"
      id="toggle-checkbox"
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
