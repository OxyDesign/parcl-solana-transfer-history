import { FC } from 'react';
import cn from 'classnames';
import { SolScanLinkProps } from './SolScanLink.types';
import styles from './SolScanLink.module.scss';

export const SolScanLink: FC<SolScanLinkProps> = ({
  className,
  children = 'SolScan',
  signature,
  ...props
}) => (
  <a
    className={cn(styles.link, className)}
    target="_blank"
    rel="noreferrer"
    {...props}
    href={`https://solscan.io/tx/${signature}?cluster=devnet`}
  >
    {children}
  </a>
);
