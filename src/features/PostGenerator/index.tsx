import { useRef } from 'react';
import { usePostGenerator } from '../../hooks/usePostGenerator';
import { useScrollToOutput } from '../../hooks/useScrollToOutput';
import { scrollToTopSmooth } from '../../utils/scroll';
import { ImageUploaderSection } from './ImageUploaderSection';
import { GeneratedPostList } from './GeneratedPostList';
import { GenerationOverlay } from './GenerationOverlay';

export function PostGenerator() {
  const { mutate, data: posts, isPending, isError } = usePostGenerator();
  const outputRef = useRef<HTMLDivElement>(null);

  const hasPosts = Boolean(posts && posts.length > 0);
  const showOutput = hasPosts && !isPending;

  useScrollToOutput({ outputRef, isReady: showOutput });

  const onGenerate = async (productFile: File, referenceFiles: File[]) => {
    if (hasPosts || window.scrollY > 0) {
      await scrollToTopSmooth();
    }

    mutate({ productFile, referenceFiles });
  };

  return (
    <section id="generator" aria-label="Generate posts" className="mt-10">
      <ImageUploaderSection
        onGenerate={onGenerate}
        isGenerating={isPending}
        isError={isError}
      />

      {isPending && <GenerationOverlay />}
      {showOutput && posts && (
        <GeneratedPostList ref={outputRef} posts={posts} />
      )}
    </section>
  );
}
