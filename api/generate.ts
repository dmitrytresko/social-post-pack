import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateScenes } from './_lib/generate.ts';
import type { GenerateBody } from './_lib/types.ts';

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { productImage, referenceImages, imagePrompt, layouts } =
    req.body as Partial<GenerateBody>;

  if (!productImage || !referenceImages?.length || !imagePrompt || !layouts) {
    res.status(400).json({
      error: 'productImage, referenceImages, imagePrompt and layouts are required',
    });
    return;
  }

  try {
    res
      .status(200)
      .json(
        await generateScenes(
          productImage,
          referenceImages,
          imagePrompt,
          layouts,
        ),
      );
  } catch (error) {
    console.error('Generate failed:', error);
    res.status(500).json({ error: 'Generation failed' });
  }
}
