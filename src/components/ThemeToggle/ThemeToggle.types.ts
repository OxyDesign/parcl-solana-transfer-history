import { ComponentPropsWithoutRef } from 'react';

export interface ThemeToggleProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  checked: boolean;
  onToggle: () => void;
}
