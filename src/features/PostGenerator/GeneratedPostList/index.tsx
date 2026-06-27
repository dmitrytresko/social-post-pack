import { PostPreview } from '../../../components/PostPreview';
import { SectionHeading } from '../../../components/SectionHeading';
import type { GeneratedPostListProps } from './types';

export function GeneratedPostList({ ref, posts }: GeneratedPostListProps) {
  const banner = posts.find((post) => post.format === 'banner');
  const story = posts.find((post) => post.format === 'story');
  const square = posts.find((post) => post.format === 'square');

  return (
    <div ref={ref} className="mt-14 scroll-mt-4 border-t border-border pt-10">
      <SectionHeading label="output" title="Your post pack" />

      <div className="mt-8 flex flex-col gap-8">
        {banner && <PostPreview post={banner} />}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {story && <PostPreview post={story} />}
          {square && <PostPreview post={square} />}
        </div>
      </div>
    </div>
  );
}
