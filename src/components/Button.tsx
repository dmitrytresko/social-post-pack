import type { ButtonHTMLAttributes } from 'react';

export function Button({
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`cursor-pointer text-muted transition-colors hover:text-accent ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
