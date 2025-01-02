import express from 'express';
import cors from 'cors';

// Mutable Application State

/**
 * A map of Short URL IDs to full original URLs
 * http://localhost/s/123, http://example.com/...
 *
 * { 123 -> 'http://example.com/...' }
 */
const urlmap: Record<number, string> = {};

// Actions

/**
 * Produces the shortened form of a given URL
 * Invariant: url is a valid URL, and does not already exist as a value in urlmap
 * Effect: updates the `urlmap` to record the url and its shortened version.
 */
function shortenUrl(url: string): string {
  const id = Object.keys(urlmap).length; // number of elements in hash table
  const short = `http://localhost:3333/s/${id}`;
  urlmap[id] = url;
  return short;
}

// App

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/shorten', (req, res) => {
  const original = req.body.original;
  const short = shortenUrl(original);

  res.send({
    short: short,
    original: original,
  });
});

app.get('/s/:id', (req, res) => {
  const id = Number(req.params.id);
  const original = urlmap[id];
  res.redirect(original);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
