const copySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    headline: { type: 'string' },
    tagline: { type: 'string' },
    cta: { type: 'string' },
  },
  required: ['headline', 'tagline', 'cta'],
};

export const analysisSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    productName: { type: 'string' },
    referenceTheme: { type: 'string' },
    accent: { type: 'string' },
    overlayColor: { type: 'string' },
    copies: {
      type: 'object',
      additionalProperties: false,
      properties: { square: copySchema, story: copySchema, banner: copySchema },
      required: ['square', 'story', 'banner'],
    },
    composition: {
      type: 'object',
      additionalProperties: false,
      properties: {
        productScale: { type: 'number' },
        productPosition: {
          type: 'string',
          enum: ['center', 'bottom-center', 'left', 'right'],
        },
        overlayOpacity: { type: 'number' },
        textColor: { type: 'string', enum: ['light', 'dark'] },
      },
      required: [
        'productScale',
        'productPosition',
        'overlayOpacity',
        'textColor',
      ],
    },
  },
  required: [
    'productName',
    'referenceTheme',
    'accent',
    'overlayColor',
    'copies',
    'composition',
  ],
};
