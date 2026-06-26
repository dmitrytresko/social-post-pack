export const ANALYSIS_PROMPT = `You are a social media creative director. You are given one product image and one or two reference scene images. Plan three social ad creatives that place the product into the reference scene's mood.

Return:
- productName: a short name for the product
- referenceTheme: a few words describing the reference scene's mood/setting
- accent: a hex color (from the reference palette) for the call-to-action pill
- overlayColor: a hex color to wash over the reference background for text legibility
- copies: distinct copy per format. headline is punchy; banner headline is the shortest, story has the most room. tagline is one supporting line; cta is 1-3 words.
- composition.productScale: 0.3-0.8 (product width relative to canvas)
- composition.productPosition: where the product sits
- composition.overlayOpacity: 0-0.5
- composition.textColor: 'light' or 'dark', whichever stays legible over the reference

Keep copy concise and free of hashtags and emoji.`;
