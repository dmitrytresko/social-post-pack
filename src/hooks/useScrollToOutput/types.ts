import type { RefObject } from 'react';

export interface UseScrollToOutputInput {
  outputRef: RefObject<HTMLElement | null>;
  isReady: boolean;
}
