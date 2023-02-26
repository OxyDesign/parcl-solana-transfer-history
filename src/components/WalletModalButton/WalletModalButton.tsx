import { FC } from 'react';
import { WalletModalButton as WalletModalButtonInternal } from '@solana/wallet-adapter-react-ui';
import cn from 'classnames';
import { WalletModalButtonProps } from './WalletModalButton.types';
import styles from '../Button/Button.module.scss';

export const WalletModalButton: FC<WalletModalButtonProps> = ({ className, ...props }) => (
  <WalletModalButtonInternal className={cn(styles.button, className)} {...props} />
);
