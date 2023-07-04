import { shortenUrl, lookupUrl, generateQR } from './persist';
import { createApp } from './app';

// Composition Root
async function main() {
  const app = await createApp({
    shortenUrl,
    lookupUrl,
   // generateQR
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main();