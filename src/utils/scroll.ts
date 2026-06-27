export function scrollToTopSmooth(maxWaitMs = 900): Promise<void> {
  if (window.scrollY < 8) return Promise.resolve();

  return new Promise((resolve) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timeout = window.setTimeout(finish, maxWaitMs);

    function finish() {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timeout);
      resolve();
    }

    function onScroll() {
      if (window.scrollY < 8) finish();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  });
}
