import { useAnimatedEllipsis } from '../../hooks/useAnimatedEllipsis';
import { useRotatingStatus } from '../../hooks/useRotatingStatus';

const STATUS_MESSAGES = [
  'Thinking',
  'Generating',
  'Compositing',
  'Writing copy',
  'Placing product',
] as const;

export function GenerationOverlay() {
  const ellipsis = useAnimatedEllipsis();
  const status = useRotatingStatus(STATUS_MESSAGES);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/65"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/20 border-t-accent"
        role="progressbar"
        aria-label="Generating posts"
      />
      <p className="mt-6 max-w-xs text-center text-sm text-white">
        Generation may take up to 3 minutes.
      </p>
      <p className="mt-2 text-center text-sm text-white/90">
        {status}
        <span className="inline-block w-[1.25em] text-left">{ellipsis}</span>
      </p>
    </div>
  );
}
