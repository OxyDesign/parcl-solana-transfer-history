import { FC, useRef } from 'react';
import { useTextField } from 'react-aria';
import cn from 'classnames';
import { NumberInputProps } from './NumberInput.types';
import styles from './NumberInput.module.scss';

export const NumberInput: FC<NumberInputProps> = ({ className, min, max, step, ...props }) => {
  const { errorMessage, label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, errorMessageProps } = useTextField(props, ref);

  return (
    <div className={cn(styles.root, className)}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label {...labelProps} className={styles.label}>
        {label}
      </label>
      <input
        {...inputProps}
        className={styles.input}
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
      />
      {errorMessage && (
        <div {...errorMessageProps} className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
