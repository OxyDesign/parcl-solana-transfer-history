import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}
