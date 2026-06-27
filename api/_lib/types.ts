export type MediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

export interface ParsedImage {
  media_type: MediaType;
  data: string;
}

export type PostFormat = 'square' | 'story' | 'banner';
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

export interface AnalyzeBody {
  productImage: string;
  referenceImages: string[];
}

export interface GenerateBody extends AnalyzeBody {
  imagePrompt: string;
  layouts: Record<PostFormat, FormatLayout>;
}
