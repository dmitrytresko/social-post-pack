import type { SectionHeadingProps } from './types';

export function SectionHeading({ label, title, level = 2 }: SectionHeadingProps) {
  const Title = level === 1 ? 'h1' : 'h2';

  return (
    <>
      <p className="text-xs font-semibold tracking-widest uppercase">
        <span className="text-muted">$</span>{' '}
        <span className="text-accent">{label}</span>
      </p>
      <Title className={`mt-2 font-bold ${level === 1 ? 'text-3xl' : 'text-xl'}`}>
        {title}
      </Title>
    </>
  );
}
