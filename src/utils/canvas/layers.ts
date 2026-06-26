import type { PostCopy, TextColor } from '../../types/posts';
import { FONT } from '../../constants/canvas';
import { drawCta, drawScrim, wrapLines } from './draw';

export function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: HTMLImageElement,
  w: number,
  h: number,
) {
  const scale = Math.max(w / scene.width, h / scene.height);
  const dw = scene.width * scale;
  const dh = scene.height * scale;
  ctx.drawImage(scene, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

export function drawCopy(
  ctx: CanvasRenderingContext2D,
  copy: PostCopy,
  accent: string,
  textColor: TextColor,
  w: number,
  h: number,
) {
  drawScrim(ctx, textColor, w, h);

  const pad = w * 0.06;
  const maxWidth = w - pad * 2;
  const headline = Math.min(w * 0.075, h * 0.085);
  const ctaSize = headline * 0.44;
  const lineHeight = headline * 1.1;
  const gap = headline * 0.55;
  const fg = textColor === 'light' ? '#ffffff' : '#111111';

  ctx.font = `700 ${headline}px ${FONT}`;
  const lines = wrapLines(ctx, copy.headline, maxWidth);
  const blockH = lines.length * lineHeight + gap + ctaSize * 2;

  let y = h - pad - blockH;
  ctx.fillStyle = fg;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (const line of lines) {
    ctx.fillText(line, pad, y);
    y += lineHeight;
  }

  y += gap;
  drawCta(ctx, copy.cta, pad, y, ctaSize, accent);
}
