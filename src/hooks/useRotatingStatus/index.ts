import { useEffect, useState } from 'react';

export function useRotatingStatus(
  messages: readonly string[],
  intervalMs = 15_000,
) {
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
