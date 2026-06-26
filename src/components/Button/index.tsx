import type { ButtonProps } from './types';
import { BUTTON_VARIANTS } from './constants';

export function Button({
  variant = 'text',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer transition-colors ${BUTTON_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
