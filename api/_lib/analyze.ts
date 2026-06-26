import Anthropic from '@anthropic-ai/sdk';
import { ANALYSIS_PROMPT } from './prompt.ts';
import { analysisSchema } from './schema.ts';
import { parseDataUrl } from './images.ts';

export async function analyze(
  productImage: string,
  referenceImages: string[],
): Promise<unknown> {
  const client = new Anthropic();
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
    throw new Error('No analysis returned from model');
  }

  return JSON.parse(block.text);
}
