import type { PostCopy, PostFormat } from './posts';

export interface Composition {
  productScale: number;
  productPosition: 'center' | 'bottom-center' | 'left' | 'right';
  overlayOpacity: number;
  textColor: 'light' | 'dark';
}

export interface AnalysisResult {
  productName: string;
  referenceTheme: string;
  accent: string;
  overlayColor: string;
  copies: Record<PostFormat, PostCopy>;
  composition: Composition;
}

export interface AnalyzeRequest {
  productImage: string;
  referenceImages: string[];
}
