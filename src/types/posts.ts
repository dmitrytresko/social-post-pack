export type PostFormat = 'square' | 'story' | 'banner';
export type TextColor = 'light' | 'dark';
export type TextEdge = 'top' | 'bottom' | 'left' | 'right';
export type ProductQuadrant =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface FormatLayout {
  productPlacement: string;
  textEdge: TextEdge;
  productQuadrant: ProductQuadrant;
}

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
