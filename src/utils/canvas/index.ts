import type { AnalysisResult } from '../../types/analysis';
import type { PostFormat } from '../../types/posts';
import { POST_FORMATS } from '../../constants/posts';
import { drawCopy, drawScene } from './layers';

export function renderPost(
  format: PostFormat,
  scene: HTMLImageElement,
  analysis: AnalysisResult,
): HTMLCanvasElement {
  const { width, height } = POST_FORMATS[format];
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  drawScene(ctx, scene, width, height);
  drawCopy(
    ctx,
    analysis.copies[format],
    analysis.accent,
    analysis.textColor,
    width,
    height,
    format,
    analysis.layouts[format],
  );

  return canvas;
}
