import { FC } from 'react';
import cn from 'classnames';
import { CardProps } from './Card.types';
import styles from './Card.module.scss';

export const Card: FC<CardProps> = ({ children, className, ...props }) => (
  <section {...props} className={cn(styles.card, className)}>
    {children}
  </section>
);
