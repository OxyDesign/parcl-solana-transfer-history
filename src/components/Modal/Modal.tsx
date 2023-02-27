import { FC, useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';
import { Card } from '../Card';
import { ModalProps } from './Modal.types';
import styles from './Modal.module.scss';

export const Modal: FC<ModalProps> = ({ state, children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return state.isOpen ? (
    <Overlay portalContainer={document.querySelector('#app-root') || document.body}>
      <div className={styles.underlay} {...underlayProps}>
        <div className={styles.modal} {...modalProps} ref={ref}>
          <Card>{children}</Card>
        </div>
      </div>
    </Overlay>
  ) : null;
};
