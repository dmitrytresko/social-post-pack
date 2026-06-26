export interface PostImages {
  product: HTMLImageElement;
  reference: HTMLImageElement;
}

export interface TextRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  align: 'top' | 'bottom' | 'center';
  scrim: 'top' | 'bottom' | 'left' | 'right';
}
