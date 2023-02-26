import { FC } from 'react';
import { WalletMultiButton as WalletMultiButtonInternal } from '@solana/wallet-adapter-react-ui';
import cn from 'classnames';
import { WalletMultiButtonProps } from './WalletMultiButton.types';
import styles from '../Button/Button.module.scss';

export const WalletMultiButton: FC<WalletMultiButtonProps> = ({ className, ...props }) => (
  <WalletMultiButtonInternal className={cn(styles.button, className)} {...props} />
);
