import { useCallback, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver';
import { SCROLL_THRESHOLDS } from './constants';
import type { UseScrollToOutputInput } from './types';

export function useScrollToOutput({
  outputRef,
  isReady,
}: UseScrollToOutputInput) {
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (isReady) {
      shouldScrollRef.current = true;
    } else {
      shouldScrollRef.current = false;
    }
  }, [isReady]);

  const onIntersect = useCallback((entry: IntersectionObserverEntry) => {
    if (!shouldScrollRef.current) {
      return;
    }

    if (entry.intersectionRatio >= 0.95) {
      shouldScrollRef.current = false;
      return;
    }

    entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    shouldScrollRef.current = false;
  }, []);

  useIntersectionObserver({
    ref: outputRef,
    onIntersect,
    threshold: [...SCROLL_THRESHOLDS],
  });
}
