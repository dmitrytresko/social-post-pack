import { usePostGenerator } from '../../hooks/usePostGenerator';
import { ImageUploaderSection } from './ImageUploaderSection';
import { GeneratedPostList } from './GeneratedPostList';

export function PostGenerator() {
  const { mutate, data: posts, isPending, isError } = usePostGenerator();

  return (
    <section id="generator" aria-label="Generate posts" className="mt-10">
      <ImageUploaderSection
        onGenerate={(productFile, referenceFiles) =>
          mutate({ productFile, referenceFiles })
        }
        isGenerating={isPending}
        isError={isError}
      />
      {posts && posts.length > 0 && <GeneratedPostList posts={posts} />}
    </section>
  );
}
