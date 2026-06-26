import type { ButtonVariant } from './types';

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'rounded-md border border-accent px-5 py-2 font-medium text-accent hover:bg-accent hover:text-bg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-accent',
  text: 'text-muted hover:text-accent',
};
