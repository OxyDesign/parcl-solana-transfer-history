import { FC, useRef } from 'react';
import { useTextField } from 'react-aria';
import cn from 'classnames';
import { TextInputProps } from './TextInput.types';
import styles from './TextInput.module.scss';

export const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
  const { errorMessage, label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);

  return (
    <div className={cn(styles.root, className)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label {...labelProps} className={styles.label}>
        {label}
      </label>
      <input {...inputProps} className={styles.input} ref={ref} />
      {errorMessage && (
        <div {...errorMessageProps} className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
