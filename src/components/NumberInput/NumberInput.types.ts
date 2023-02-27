import { AriaTextFieldProps } from 'react-aria';

export interface NumberInputProps extends AriaTextFieldProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}
