import { GoogleGenAI } from '@google/genai';
import { parseDataUrl } from './images.ts';

const ASPECT_RATIOS = {
  square: '1:1',
  story: '9:16',
  banner: '16:9',
} as const;

type Format = keyof typeof ASPECT_RATIOS;

export async function generateScenes(
  productImage: string,
  referenceImages: string[],
  imagePrompt: string,
): Promise<Record<Format, string>> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const product = parseDataUrl(productImage);
  const references = referenceImages.map(parseDataUrl);

  const contents = [
    {
      text: `The first image is the product to feature. The following image is the reference scene. ${imagePrompt} Place the product into the scene; keep its real shape and label.`,
    },
    { inlineData: { mimeType: product.media_type, data: product.data } },
    ...references.map((ref) => ({
      inlineData: { mimeType: ref.media_type, data: ref.data },
    })),
  ];

  const formats = Object.keys(ASPECT_RATIOS) as Format[];
  const entries = await Promise.all(
    formats.map(async (format) => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents,
        config: { imageConfig: { aspectRatio: ASPECT_RATIOS[format] } },
      });

      const image = response.candidates?.[0]?.content?.parts?.find(
        (part) => part.inlineData?.data,
      )?.inlineData;
      if (!image?.data) {
        throw new Error('No image returned from model');
      }

      const mime = image.mimeType ?? 'image/png';
      return [format, `data:${mime};base64,${image.data}`] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<Format, string>;
}
