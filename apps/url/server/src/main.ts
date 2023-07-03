import { shortenUrl, lookupUrl } from './persist';
import { createApp } from './app';

// Composition Root
async function main() {
  const app = await createApp({
    shortenUrl,
    lookupUrl,
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main();