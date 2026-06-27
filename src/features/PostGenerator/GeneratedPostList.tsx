import type { Ref } from 'react';
import type { GeneratedPost } from '../../types/posts';
import { PostPreview } from '../../components/PostPreview';

interface GeneratedPostListProps {
  ref: Ref<HTMLDivElement>;
  posts: GeneratedPost[];
}

export function GeneratedPostList({ ref, posts }: GeneratedPostListProps) {
  const banner = posts.find((post) => post.format === 'banner');
  const story = posts.find((post) => post.format === 'story');
  const square = posts.find((post) => post.format === 'square');

  return (
    <div ref={ref} className="mt-14 scroll-mt-4 border-t border-border pt-10">
      <p className="text-accent">$ output</p>
      <h2 className="mt-2 mb-8 text-xl font-bold">Your post pack</h2>

      <div className="flex flex-col gap-8">
        {banner && <PostPreview post={banner} />}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {story && <PostPreview post={story} />}
          {square && <PostPreview post={square} />}
        </div>
      </div>
    </div>
  );
}
