import type { AnalysisResult } from '../../types/analysis';
import type { PostFormat } from '../../types/posts';
import type { PostImages } from '../../types/canvas';
import { POST_FORMATS } from '../../constants/posts';
import { drawBackground, drawCopy, drawProduct } from './layers';

export function renderPost(
  format: PostFormat,
  images: PostImages,
  analysis: AnalysisResult,
): HTMLCanvasElement {
  const { width, height } = POST_FORMATS[format];
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const { composition, overlayColor, accent } = analysis;

  drawBackground(
    ctx,
    images.reference,
    overlayColor,
    composition.overlayOpacity,
    width,
    height,
  );
  drawProduct(ctx, images.product, composition, width, height);
  drawCopy(ctx, analysis.copies[format], composition, accent, width, height);

  return canvas;
}
