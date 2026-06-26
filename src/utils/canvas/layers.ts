import type { Composition } from '../../types/analysis';
import type { PostCopy } from '../../types/posts';
import type { TextRegion } from '../../types/canvas';
import { FONT } from '../../constants/canvas';
import { drawCta, drawScrim, wrapLines } from './draw';

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  reference: HTMLImageElement,
  washColor: string,
  washOpacity: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / reference.width, h / reference.height);
  const dw = reference.width * scale;
  const dh = reference.height * scale;
  ctx.drawImage(reference, (w - dw) / 2, (h - dh) / 2, dw, dh);

  ctx.save();
  ctx.globalAlpha = Math.min(Math.max(washOpacity, 0), 0.6);
  ctx.fillStyle = washColor;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

export function drawProduct(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  comp: Composition,
  w: number,
  h: number,
) {
  const scale = Math.min(Math.max(comp.productScale, 0.3), 0.8);
  let dw = w * scale;
  let dh = (img.height / img.width) * dw;

  if (comp.productPosition === 'left' || comp.productPosition === 'right') {
    const maxW = w * 0.46;
    if (dw > maxW) {
      dh *= maxW / dw;
      dw = maxW;
    }
  }

  const { x, y } = placeProduct(comp.productPosition, dw, dh, w, h);

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = w * 0.03;
  ctx.shadowOffsetY = h * 0.012;
  ctx.drawImage(img, x, y, dw, dh);
  ctx.restore();
}

export function drawCopy(
  ctx: CanvasRenderingContext2D,
  copy: PostCopy,
  comp: Composition,
  accent: string,
  w: number,
  h: number,
) {
  const region = textRegion(comp.productPosition, w, h);
  drawScrim(ctx, region, comp.textColor);

  const pad = w * 0.06;
  const innerX = region.x + pad;
  const maxWidth = region.w - pad * 2;
  const headline = Math.min(region.w * 0.09, region.h * 0.16);
  const tagline = headline * 0.42;
  const ctaSize = headline * 0.4;
  const lineHeight = headline * 1.1;
  const fg = comp.textColor === 'light' ? '#ffffff' : '#111111';

  ctx.font = `700 ${headline}px ${FONT}`;
  const lines = wrapLines(ctx, copy.headline, maxWidth);

  const gapAfterHeadline = headline * 0.4;
  const taglineH = tagline * 1.2;
  const gapAfterTagline = tagline * 1.1;
  const blockH =
    lines.length * lineHeight +
    gapAfterHeadline +
    taglineH +
    gapAfterTagline +
    ctaSize * 2;

  let y = region.y + pad;
  if (region.align === 'bottom') y = region.y + region.h - pad - blockH;
  else if (region.align === 'center') y = region.y + (region.h - blockH) / 2;

  ctx.fillStyle = fg;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (const line of lines) {
    ctx.fillText(line, innerX, y);
    y += lineHeight;
  }

  y += gapAfterHeadline;
  ctx.font = `400 ${tagline}px ${FONT}`;
  ctx.fillText(copy.tagline, innerX, y);

  y += taglineH + gapAfterTagline;
  drawCta(ctx, copy.cta, innerX, y, ctaSize, accent);
}

function placeProduct(
  pos: Composition['productPosition'],
  dw: number,
  dh: number,
  w: number,
  h: number,
) {
  const m = w * 0.05;
  switch (pos) {
    case 'bottom-center':
      return { x: (w - dw) / 2, y: h - dh - h * 0.06 };
    case 'left':
      return { x: m, y: (h - dh) / 2 };
    case 'right':
      return { x: w - dw - m, y: (h - dh) / 2 };
    case 'center':
      return { x: (w - dw) / 2, y: (h - dh) / 2 };
  }
}

function textRegion(
  pos: Composition['productPosition'],
  w: number,
  h: number,
): TextRegion {
  switch (pos) {
    case 'bottom-center':
      return { x: 0, y: 0, w, h: h * 0.42, align: 'top', scrim: 'top' };
    case 'left':
      return {
        x: w * 0.5,
        y: 0,
        w: w * 0.5,
        h,
        align: 'center',
        scrim: 'right',
      };
    case 'right':
      return { x: 0, y: 0, w: w * 0.5, h, align: 'center', scrim: 'left' };
    case 'center':
      return {
        x: 0,
        y: h * 0.55,
        w,
        h: h * 0.45,
        align: 'bottom',
        scrim: 'bottom',
      };
  }
}
