/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import getAllPractitioners from './workflows/getAllPractitioners';
// Import effectful dependencies (database connections, email clients, etc.)
import { scanAllPractitioners } from './dynamodb';
import { zodiosApp } from '@zodios/express';
import { userApi } from '@c4c/monarch/common';
import serverlessExpress from '@vendia/serverless-express';

// Need to use base Express in order for compat with serverless-express
// See: https://github.com/ecyrbe/zodios-express/issues/103
export const baseApp = express();
export const app = zodiosApp(userApi, { express: baseApp });
export const handler = serverlessExpress({ app: baseApp });

//TODO: Use for local testing https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
const db = [];

// Composition Root
const getAllPractitionersHandler = async () =>
  getAllPractitioners(scanAllPractitioners);

app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).json({ ok: Date.now() });
});

app.get('/practitioners', async (_req, res) => {
  const practitioners = await getAllPractitionersHandler();
  res.status(200).json(practitioners).end();
});

//app.use('/assets', express.static(path.join(__dirname, 'assets')));

// If running locally just use express
// Otherwise, we want to export a lambda handler and theres no need to start a server!
if (!process.env.PRODUCTION) {
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  server.on('error', console.error);
}
