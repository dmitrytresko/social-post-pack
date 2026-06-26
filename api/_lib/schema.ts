const copySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    headline: { type: 'string' },
    cta: { type: 'string' },
  },
  required: ['headline', 'cta'],
};

export const analysisSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    imagePrompt: { type: 'string' },
    accent: { type: 'string' },
    textColor: { type: 'string', enum: ['light', 'dark'] },
    copies: {
      type: 'object',
      additionalProperties: false,
      properties: { square: copySchema, story: copySchema, banner: copySchema },
      required: ['square', 'story', 'banner'],
    },
  },
  required: ['imagePrompt', 'accent', 'textColor', 'copies'],
};
