import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  onIntersect: (entry: IntersectionObserverEntry) => void,
  threshold: number | number[] = 0,
) {
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
