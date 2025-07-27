import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * 🔹 Client Render Route fallback for /login
 * 如果是 /login，直接回傳 index.csr.html (CSR 模板)
 */
app.get('/login', (req, res) => {
  const csrIndex = join(browserDistFolder, 'index.csr.html');
  if (existsSync(csrIndex)) {
    res.sendFile(csrIndex);
  } else {
    console.error('⚠️ index.csr.html not found in browserDistFolder');
    res.status(404).send('index.csr.html not found');
  }
});

app.get('/landing', (req, res) => {
  const landing = join(browserDistFolder, 'landing/index.html');
  if (existsSync(landing)) {
    res.sendFile(landing);
  } else {
    console.error('⚠️ landing index.html not found in browserDistFolder');
    res.status(404).send('landing index.html not found');
  }
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
