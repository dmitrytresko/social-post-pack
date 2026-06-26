export type MediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

export function parseDataUrl(dataUrl: string): {
  media_type: MediaType;
  data: string;
} {
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|png|gif|webp));base64,(.*)$/,
  );

  if (!match) throw new Error('Unsupported image format');

  return { media_type: match[1] as MediaType, data: match[2] };
}
