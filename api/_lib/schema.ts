const copySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    headline: { type: 'string' },
    cta: { type: 'string' },
  },
  required: ['headline', 'cta'],
};

const layoutSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    productPlacement: { type: 'string' },
    textEdge: {
      type: 'string',
      enum: ['top', 'bottom', 'left', 'right'],
    },
    productQuadrant: {
      type: 'string',
      enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
  },
  required: ['productPlacement', 'textEdge', 'productQuadrant'],
};

const layoutsSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    square: layoutSchema,
    story: layoutSchema,
    banner: layoutSchema,
  },
  required: ['square', 'story', 'banner'],
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
    layouts: layoutsSchema,
  },
  required: ['imagePrompt', 'accent', 'textColor', 'copies', 'layouts'],
};
