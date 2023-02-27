import { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface TabProps {
  name: ReactNode;
  path: string;
}

export interface NavigationTabsProps extends ComponentPropsWithoutRef<'nav'> {
  className?: string;
  tabs: TabProps[];
}
