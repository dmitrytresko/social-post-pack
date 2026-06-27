import { useMutation } from '@tanstack/react-query';
import type { GeneratedPost } from '../../types/posts';
import { analyzeImages, generateScenes } from '../../utils/api';
import { fileToDataUrl, loadImage } from '../../utils/image';
import { renderPost } from '../../utils/canvas';
import { POST_FORMAT_LIST } from '../../constants/posts';
import type { GeneratePostsInput } from './types';

async function generatePosts({
  productFile,
  referenceFiles,
}: GeneratePostsInput): Promise<GeneratedPost[]> {
  const productImage = await fileToDataUrl(productFile);
  const referenceImages = await Promise.all(referenceFiles.map(fileToDataUrl));

  const analysis = await analyzeImages({ productImage, referenceImages });

  const scenes = await generateScenes({
    productImage,
    referenceImages,
    imagePrompt: analysis.imagePrompt,
    layouts: analysis.layouts,
  });

  await Promise.all([
    document.fonts.load('600 1em Inter'),
    document.fonts.load('700 1em Inter'),
  ]);

  return Promise.all(
    POST_FORMAT_LIST.map(async (format) => {
      const scene = await loadImage(scenes[format]);
      const dataUrl = renderPost(format, scene, analysis).toDataURL(
        'image/png',
      );
      return { format, dataUrl };
    }),
  );
}

export function usePostGenerator() {
  return useMutation({ mutationFn: generatePosts });
}
