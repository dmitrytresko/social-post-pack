import { GoogleGenAI } from '@google/genai';
import { normalizeLayout } from './layout.ts';
import { buildScenePrompt } from './prompt.ts';
import { parseDataUrl } from './images.ts';
import type { FormatLayout, PostFormat } from './types.ts';

const ASPECT_RATIOS: Record<PostFormat, string> = {
  square: '1:1',
  story: '9:16',
  banner: '16:9',
};

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export async function generateScenes(
  productImage: string,
  referenceImages: string[],
  imagePrompt: string,
  layouts: Record<PostFormat, FormatLayout>,
): Promise<Record<PostFormat, string>> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const product = parseDataUrl(productImage);
  const references = referenceImages.map(parseDataUrl);

  const imageParts = [
    { inlineData: { mimeType: product.media_type, data: product.data } },
    ...references.map((ref) => ({
      inlineData: { mimeType: ref.media_type, data: ref.data },
    })),
  ];

  const formats = Object.keys(ASPECT_RATIOS) as PostFormat[];
  const entries = await Promise.all(
    formats.map(async (format) => {
      const layout = normalizeLayout(layouts[format]);
      const dataUrl = await withRetry(async () => {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: [
            { text: buildScenePrompt(format, imagePrompt, layout) },
            ...imageParts,
          ],
          config: {
            seed: Math.floor(Math.random() * 2 ** 31),
            imageConfig: { aspectRatio: ASPECT_RATIOS[format] },
          },
        });

        const image = response.candidates?.[0]?.content?.parts?.find(
          (part) => part.inlineData?.data,
        )?.inlineData;
        if (!image?.data) {
          throw new Error('No image returned from model');
        }

        const mime = image.mimeType ?? 'image/png';
        return `data:${mime};base64,${image.data}`;
      });

      return [format, dataUrl] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<PostFormat, string>;
}
