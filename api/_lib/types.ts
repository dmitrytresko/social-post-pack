export type MediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

export interface ParsedImage {
  media_type: MediaType;
  data: string;
}

export interface AnalyzeBody {
  productImage: string;
  referenceImages: string[];
}

export interface GenerateBody extends AnalyzeBody {
  imagePrompt: string;
}
