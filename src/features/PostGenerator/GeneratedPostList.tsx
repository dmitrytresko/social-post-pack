import type { GeneratedPost } from '../../types/posts';
import { PostPreview } from '../../components/PostPreview';

interface GeneratedPostListProps {
  posts: GeneratedPost[];
}

export function GeneratedPostList({ posts }: GeneratedPostListProps) {
  const banner = posts.find((post) => post.format === 'banner');
  const rest = posts.filter((post) => post.format !== 'banner');

  return (
    <div className="mt-14 border-t border-border pt-10">
      <p className="text-accent">$ output</p>
      <h2 className="mt-2 mb-8 text-xl font-bold">Your post pack</h2>

      <div className="flex flex-col gap-8">
        {banner && <PostPreview post={banner} />}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rest.map((post) => (
            <PostPreview key={post.format} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
