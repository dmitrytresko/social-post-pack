import { FONT } from '../../constants/canvas';

export function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function fitHeadlineSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  min: number,
  max: number,
  maxLines: number,
): number {
  for (let size = max; size >= min; size -= 2) {
    ctx.font = `700 ${size}px ${FONT}`;
    if (wrapLines(ctx, text, maxWidth).length <= maxLines) return size;
  }
  return min;
}

export function drawCta(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  accent: string,
) {
  ctx.font = `600 ${size}px ${FONT}`;
  const padX = size * 0.75;
  const pillW = ctx.measureText(text).width + padX * 2;
  const pillH = size * 1.75;

  ctx.beginPath();
  ctx.roundRect(x, y, pillW, pillH, pillH / 2);
  ctx.fillStyle = accent;
  ctx.fill();

  ctx.fillStyle = contrastText(accent);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padX, y + pillH / 2);

  return pillH;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function contrastText(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  if (Number.isNaN(n)) return '#ffffff';

  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = luminance(r, g, b);

  if (lum > 150) {
    return lum > 190 ? '#1b2838' : '#111111';
  }

  if (b > r + 20 && b > g) return '#ffeb3b';
  if (g > r + 15 && g > b) return '#fff8f0';
  if (r > g && b > g) return '#ffd700';
  return '#ffffff';
}
