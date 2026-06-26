import type { PostCopy, PostFormat, TextColor } from './posts';

export interface AnalysisResult {
  imagePrompt: string;
  accent: string;
  textColor: TextColor;
  copies: Record<PostFormat, PostCopy>;
}

export interface AnalyzeRequest {
  productImage: string;
  referenceImages: string[];
}
