import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export interface ModalProps extends AriaModalOverlayProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}
