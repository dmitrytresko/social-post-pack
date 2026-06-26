import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
