import type { AnalysisResult, AnalyzeRequest } from '../types/analysis';
import type { PostFormat } from '../types/posts';

export async function analyzeImages(
  payload: AnalyzeRequest,
): Promise<AnalysisResult> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Analysis request failed');
  }

  return res.json() as Promise<AnalysisResult>;
}

export interface GenerateRequest {
  productImage: string;
  referenceImages: string[];
  imagePrompt: string;
  layouts: AnalysisResult['layouts'];
}

export async function generateScenes(
  payload: GenerateRequest,
): Promise<Record<PostFormat, string>> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Generation request failed');
  }

  return res.json() as Promise<Record<PostFormat, string>>;
}
