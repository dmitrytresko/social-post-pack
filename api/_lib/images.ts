import type { MediaType, ParsedImage } from './types.js';

export function parseDataUrl(dataUrl: string): ParsedImage {
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|png|gif|webp));base64,(.*)$/,
  );

  if (!match) throw new Error('Unsupported image format');

  return { media_type: match[1] as MediaType, data: match[2] };
}
