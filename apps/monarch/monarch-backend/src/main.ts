/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import getAllPractitioners from './workflows/getAllPractitioners';
import postNewPractitioner from './workflows/postNewPractitioner';
// Import effectful dependencies (database connections, email clients, etc.)
import { scanAllPractitioners, postPractitioner } from './dynamodb';
import { zodiosApp } from '@zodios/express';
import { userApi } from '@c4c/monarch/common';
import serverlessExpress from '@vendia/serverless-express';

import CognitoExpress from "cognito-express";
import { Request, Response } from 'express';
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

const postPractitionerHandler = async (req: Request) => {
	return postNewPractitioner(req, postPractitioner);
}

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ ok: Date.now() });
});

app.get('/practitioners', async (_req: Request, res: Response) => {
  const practitioners = await getAllPractitionersHandler();
  res.status(200).json(practitioners).end();
});

// app.post('/practitioners', async (req: Request, res: Response) => {
// 	const practitioner = await postPractitionerHandler(req);
// 	res.status(201).json(practitioner).end();
// });

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: "us-east-1",
	cognitoUserPoolId: "us-east-1_bGBPdcC4V",
	IdentityPoolId: 'us-east-1:0582dc75-ef6d-4aeb-a1b7-f40d9a2f4c37',
    RoleArn: 'arn:aws:cognito-identity:us-east-1:489881683177:identitypool/us-east-1:0582dc75-ef6d-4aeb-a1b7-f40d9a2f4c37',
    AccountId: '489881683177', // your AWS account ID
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

const authenticatedRoute = express.Router();

app.use("/", authenticatedRoute);

//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
authenticatedRoute.use(function(req, res, next) {
	
	//I'm passing in the access token in header under key accessToken
	const accessTokenFromClient = req.headers.accesstoken;

	//Fail if token not present in header. 
	if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

	cognitoExpress.validate(accessTokenFromClient, function(err, response) {
		
		//If API is not authenticated, Return 401 with error message. 
		if (err) return res.status(401).send(err);
		
		//Else API has been authenticated. Proceed.
		res.locals.user = response;
		next();
	});
});

//Define your routes that need authentication check
authenticatedRoute.get("/admin", (req, res) => {
	res.status(200).json({ ok: 47 });
});

authenticatedRoute.post('/practitioners', async (req: Request, res: Response) => {
	const practitioner = await postPractitionerHandler(req);
	res.status(201).json(practitioner).end();
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
