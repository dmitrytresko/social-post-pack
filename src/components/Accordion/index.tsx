import { SectionHeading } from '../SectionHeading';
import type { AccordionProps } from './types';

export function Accordion({ label, title, children }: AccordionProps) {
  return (
    <details className="group rounded-lg border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
        <div>
          <SectionHeading label={label} title={title} />
        </div>
        <svg
          className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-border px-6 py-8">{children}</div>
    </details>
  );
}
