import type { PostCopy, PostFormat, TextColor, FormatLayout } from './posts';

export interface AnalysisResult {
  imagePrompt: string;
  accent: string;
  textColor: TextColor;
  copies: Record<PostFormat, PostCopy>;
  layouts: Record<PostFormat, FormatLayout>;
}

export interface AnalyzeRequest {
  productImage: string;
  referenceImages: string[];
}
