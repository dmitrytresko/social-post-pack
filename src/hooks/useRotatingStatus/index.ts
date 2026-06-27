import { useEffect, useState } from 'react';
import type { UseRotatingStatusInput } from './types';

export function useRotatingStatus({
  messages,
  intervalMs = 15_000,
}: UseRotatingStatusInput) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => {
        if (messages.length <= 1) return 0;
        let next = current;
        while (next === current) {
          next = Math.floor(Math.random() * messages.length);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [messages, intervalMs]);

  return messages[index];
}
