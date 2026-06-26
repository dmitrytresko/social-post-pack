export type PostFormat = 'square' | 'story' | 'banner';
export type TextColor = 'light' | 'dark';

export interface PostCopy {
  headline: string;
  cta: string;
}

export interface FormatSpec {
  width: number;
  height: number;
  label: string;
}

export interface GeneratedPost {
  format: PostFormat;
  dataUrl: string;
}
