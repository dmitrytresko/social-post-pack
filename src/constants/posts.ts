import type { FormatSpec, PostFormat } from '../types/posts';

export const POST_FORMATS: Record<PostFormat, FormatSpec> = {
  square: { width: 1080, height: 1080, label: 'Square' },
  story: { width: 1080, height: 1920, label: 'Story' },
  banner: { width: 1200, height: 628, label: 'Wide banner' },
};
