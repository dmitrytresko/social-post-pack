import { useEffect, useRef } from 'react';
import type { UseIntersectionObserverInput } from './types';

export function useIntersectionObserver({
  ref,
  onIntersect,
  threshold = 0,
}: UseIntersectionObserverInput) {
  const onIntersectRef = useRef(onIntersect);
  onIntersectRef.current = onIntersect;

  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(',')
    : String(threshold);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) onIntersectRef.current(entry);
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, thresholdKey, threshold]);
}
