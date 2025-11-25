import { AngularAppEngine, ɵsetAngularAppEngineManifest } from '@angular/ssr';
import { createWebRequestFromNodeRequest } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const manifestPath = resolve(serverDistFolder, 'angular-app-engine-manifest.mjs');
const manifestModule = require(manifestPath);
ɵsetAngularAppEngineManifest(manifestModule.default);
const angularAppEngine = new AngularAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
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
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', async (req, res) => {
  const webRequest = createWebRequestFromNodeRequest(req);
  const response = await angularAppEngine.handle(webRequest);
  if (response) {
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      response.body.pipeTo(new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        }
      }));
    } else {
      res.end();
    }
  } else {
    res.status(404).end();
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
