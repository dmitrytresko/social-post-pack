import type { RefObject } from 'react';

export interface UseIntersectionObserverInput {
  ref: RefObject<Element | null>;
  onIntersect: (entry: IntersectionObserverEntry) => void;
  threshold?: number | number[];
}
