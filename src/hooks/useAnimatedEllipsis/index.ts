import { useEffect, useState } from 'react';

export function useAnimatedEllipsis(intervalMs = 450) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((current) => (current % 3) + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return '.'.repeat(count);
}
