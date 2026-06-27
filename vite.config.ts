import { defineConfig, loadEnv, type Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { analyze } from './api/_lib/analyze.ts';
import { generateScenes } from './api/_lib/generate.ts';
import type { AnalyzeBody, GenerateBody } from './api/_lib/types.ts';

function readJson(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function jsonRoute(handler: (body: unknown) => Promise<unknown>) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end();
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    try {
      res.end(JSON.stringify(await handler(await readJson(req))));
    } catch (error) {
      console.error('Request failed:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Request failed' }));
    }
  };
}

// runs the /api functions inside the ite dev server
// production uses the handlers in api/
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(
        '/api/analyze',
        jsonRoute((body) => {
          const { productImage, referenceImages } = body as AnalyzeBody;
          return analyze(productImage, referenceImages);
        }),
      );
      server.middlewares.use(
        '/api/generate',
        jsonRoute((body) => {
          const { productImage, referenceImages, imagePrompt, layouts } =
            body as GenerateBody;
          return generateScenes(
            productImage,
            referenceImages,
            imagePrompt,
            layouts,
          );
        }),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.ANTHROPIC_API_KEY) {
    process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  }
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [react(), tailwindcss(), devApi()],
  };
});
