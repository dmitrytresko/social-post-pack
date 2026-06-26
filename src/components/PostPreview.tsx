import type { GeneratedPost } from '../types/posts';
import { POST_FORMATS } from '../constants/posts';

interface PostPreviewProps {
  post: GeneratedPost;
}

export function PostPreview({ post }: PostPreviewProps) {
  const { label } = POST_FORMATS[post.format];

  return (
    <figure className="flex flex-col gap-3">
      <img
        src={post.dataUrl}
        alt={`${label} creative`}
        className="w-full rounded-lg border border-border"
      />
      <figcaption className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <a
          href={post.dataUrl}
          download={`${post.format}.png`}
          className="text-sm text-accent transition-colors hover:underline"
        >
          Download PNG
        </a>
      </figcaption>
    </figure>
  );
}
