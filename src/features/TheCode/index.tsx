import { useState } from 'react';
import { Accordion } from '../../components/Accordion';
import { REPO_URL } from './constants';

export function TheCode() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(REPO_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <section
      id="the-code"
      aria-label="The code"
      className="mt-14 border-t border-border pt-10"
    >
      <Accordion label="the code" title="Browse the repo">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void onCopy()}
          className="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-accent transition-colors hover:border-accent"
        >
          <span>{REPO_URL}</span>
          <span className="text-xs text-muted">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </a>
      </Accordion>
    </section>
  );
}
