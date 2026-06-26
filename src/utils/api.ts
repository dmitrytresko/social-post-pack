import type { AnalysisResult, AnalyzeRequest } from '../types/analysis';

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
