import type { Ref } from 'react';
import type { GeneratedPost } from '../../../types/posts';

export interface GeneratedPostListProps {
  ref: Ref<HTMLDivElement>;
  posts: GeneratedPost[];
}
