import { FC, useRef } from 'react';
import { useButton } from 'react-aria';
import cn from 'classnames';
import { Loader } from '../Loader';
import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = ({ isLoading = false, ...props }) => {
  const { children, className, isDisabled } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton({ ...props, isDisabled: isDisabled || isLoading }, ref);

  return (
    <button type="button" {...buttonProps} ref={ref} className={cn(styles.button, className)}>
      <span className={styles.content}>{children}</span>
      {isLoading ? <Loader /> : null}
    </button>
  );
};
