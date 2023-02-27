import { ComponentPropsWithoutRef } from 'react';

export interface SolScanLinkProps extends ComponentPropsWithoutRef<'a'> {
  className?: string;
  signature: string;
}
