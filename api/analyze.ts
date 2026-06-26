import type { VercelRequest, VercelResponse } from '@vercel/node';
import { analyze } from './_lib/analyze.ts';
import type { AnalyzeBody } from './_lib/types.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { productImage, referenceImages } = req.body as Partial<AnalyzeBody>;

  if (!productImage || !referenceImages?.length) {
    res.status(400).json({
      error: 'productImage and at least one referenceImage are required',
    });
    return;
  }

  try {
    res.status(200).json(await analyze(productImage, referenceImages));
  } catch (error) {
    console.error('Analyze failed:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}
