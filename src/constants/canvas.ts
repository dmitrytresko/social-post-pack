import type { PostFormat } from '../types/posts';

export const FONT = 'Inter, system-ui, sans-serif';

export interface TypographyScale {
  headlineMin: number;
  headlineMax: number;
  ctaMin: number;
  ctaMax: number;
  ctaRatio: number;
  maxHeadlineLines: number;
  edgePad: number;
}

export const TYPOGRAPHY: Record<PostFormat, TypographyScale> = {
  square: {
    headlineMin: 60,
    headlineMax: 80,
    ctaMin: 35,
    ctaMax: 40,
    ctaRatio: 0.48,
    maxHeadlineLines: 2,
    edgePad: 0.09,
  },
  story: {
    headlineMin: 48,
    headlineMax: 80,
    ctaMin: 30,
    ctaMax: 40,
    ctaRatio: 0.5,
    maxHeadlineLines: 3,
    edgePad: 0.1,
  },
  banner: {
    headlineMin: 60,
    headlineMax: 74,
    ctaMin: 25,
    ctaMax: 30,
    ctaRatio: 0.38,
    maxHeadlineLines: 2,
    edgePad: 0.055,
  },
};

export const SCRIM_OPACITY = 0.48;
