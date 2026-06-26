export type PostFormat = 'square' | 'story' | 'banner';

export interface PostCopy {
  headline: string;
  tagline: string;
  cta: string;
}

export interface FormatSpec {
  width: number;
  height: number;
  label: string;
}
