import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { ANALYSIS_PROMPT } from './_lib/prompt.ts';
import { analysisSchema } from './_lib/schema.ts';
import { parseDataUrl } from './_lib/images.ts';

const client = new Anthropic();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { productImage, referenceImages } = req.body as {
    productImage?: string;
    referenceImages?: string[];
  };

  if (!productImage || !referenceImages?.length) {
    res.status(400).json({
      error: 'productImage and at least one referenceImage are required',
    });

    return;
  }

  try {
    const product = parseDataUrl(productImage);
    const references = referenceImages.map(parseDataUrl);

    const content: Anthropic.ContentBlockParam[] = [
      { type: 'text', text: ANALYSIS_PROMPT },
      { type: 'text', text: 'Product image:' },
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: product.media_type,
          data: product.data,
        },
      },
      { type: 'text', text: 'Reference scene image(s):' },
      ...references.map(
        (ref): Anthropic.ContentBlockParam => ({
          type: 'image',
          source: {
            type: 'base64',
            media_type: ref.media_type,
            data: ref.data,
          },
        }),
      ),
    ];

    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      output_config: {
        format: { type: 'json_schema', schema: analysisSchema },
      },
      messages: [{ role: 'user', content }],
    });

    const block = message.content.find((b) => b.type === 'text');
    if (block?.type !== 'text') {
      res.status(502).json({ error: 'No analysis returned from model' });
      return;
    }

    res.status(200).json(JSON.parse(block.text));
  } catch (error) {
    console.error('Analyze failed:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
}
