import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver';

const SCROLL_THRESHOLDS = [0, 0.5, 0.85, 1] as const;

export function useScrollToOutput(
  outputRef: RefObject<HTMLElement | null>,
  isReady: boolean,
) {
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (isReady) {
      shouldScrollRef.current = true;
    } else {
      shouldScrollRef.current = false;
    }
  }, [isReady]);

  const onIntersect = useCallback((entry: IntersectionObserverEntry) => {
    if (!shouldScrollRef.current) return;
    if (entry.intersectionRatio >= 0.95) {
      shouldScrollRef.current = false;
      return;
    }
    entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    shouldScrollRef.current = false;
  }, []);

  useIntersectionObserver(outputRef, onIntersect, [...SCROLL_THRESHOLDS]);
}
