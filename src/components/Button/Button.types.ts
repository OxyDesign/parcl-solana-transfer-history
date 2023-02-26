import { AriaButtonProps } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  isLoading?: boolean;
}
