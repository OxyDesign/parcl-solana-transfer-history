import { FC } from 'react';
import cn from 'classnames';
import { LoaderProps } from './Loader.types';
import styles from './Loader.module.scss';

export const Loader: FC<LoaderProps> = ({ className, ...props }) => (
  <div className={cn(styles.root, className)} {...props}>
    <div className={styles.loader} />
  </div>
);
