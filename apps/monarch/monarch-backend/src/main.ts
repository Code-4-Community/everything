/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import bodyParser, { BodyParser } from 'body-parser';
import multer, { Multer } from 'multer';
import getAllPractitioners from './workflows/getAllPractitioners';
import getPendingPractitioners from './workflows/getPendingPractitioners';
import postNewPractitioner from './workflows/postNewPractitioner';
import updatePractitionerWF from './workflows/updatePractitioner';
import deletePractitionerWF from './workflows/deletePractitioner';
import deletePendingPractitionerWF from './workflows/deletePendingPractitioner';
import getGeocode from './workflows/getGeocode';
// Import effectful dependencies (database connections, email clients, etc.)
import { scanAllPractitioners, scanPendingPractitioners, postPractitioner, updatePractitioner, deletePractitioner, deletePendingPractitioner, postPendingPractitioner } from './dynamodb';
import { extractGeocode } from './location';
import { zodiosApp } from '@zodios/express';
import { userApi, isValidZipcode } from '@c4c/monarch/common';
import serverlessExpress from '@vendia/serverless-express';

import CognitoExpress from "cognito-express";
import { Request, Response } from 'express';
import postNewPendingPractitioner from './workflows/postPendingPractitioner';
// Need to use base Express in order for compat with serverless-express
// See: https://github.com/ecyrbe/zodios-express/issues/103
export const baseApp = express();
baseApp.use(cors());
baseApp.options('*', cors());

export const app = zodiosApp(userApi, { express: baseApp });
export const handler = serverlessExpress({ app: baseApp });

// Composition Root
const getAllPractitionersHandler = async () =>
  getAllPractitioners(scanAllPractitioners);

const getPendingPractitionersHandler = async (req: Request) =>
  getPendingPractitioners(req, scanPendingPractitioners);

const postPractitionerHandler = async (req: Request) => {
	return postNewPractitioner(req, postPractitioner);
}

const postPendingPractitionerHandler = async (req: Request) => {
	return postNewPendingPractitioner(req, postPendingPractitioner)
}

const updatePractitionerHandler = async(req: Request) => {
	return updatePractitionerWF(req, updatePractitioner);
}

const deletePractitionerHandler = async (req: Request) => {
	return deletePractitionerWF(req, deletePractitioner);
}

const deletePendingPractitionerHandler = async (req: Request) => {
	return deletePendingPractitionerWF(req, deletePendingPractitioner);
}

const getGeocodeHandler = async (address: string) => {
  return getGeocode(address, extractGeocode);
};

// Allow parsing form-encoded data for JotForm webhook requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({ ok: Date.now() });
});

app.get('/practitioners', async (_req: Request, res: Response) => {
	const practitioners = await getAllPractitionersHandler();
	res.status(200).json(practitioners).end();
});

// multer middleware to parse form data
app.post('/pendingPractitioners', multer().array("data"), async (req: Request, res: Response) => {
	// This route should be secured, but JotForm doesn't allow us to specify
	// request headers as part of their webhook, so pass a secret as a query param instead
	if (req.query.auth !== process.env.JOTFORM_AUTH_KEY) {
		res.status(404).json("Incorrect auth").end();
	} else {
		const pendingPractitioner = await postPendingPractitionerHandler(req);
		res.status(200).json({}).end();
	}
})

app.get('/geocode', async (req, res) => {
	if (!isValidZipcode(req.query.zipcode)) {
		res.status(400);
	}
	const geocode = await getGeocodeHandler(req.query.zipcode);
	res.status(200).json(geocode).end();
  });

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: "us-east-2",
	cognitoUserPoolId: "us-east-2_1rcy5geWJ",
	IdentityPoolId: 'us-east-2:fd79ce99-02f6-452c-817d-dda8073a543a',
    RoleArn: 'arn:aws:cognito-identity:us-east-2:144397330194:identitypool/us-east-2:fd79ce99-02f6-452c-817d-dda8073a543a',
    AccountId: '144397330194', // your AWS account ID
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

authenticatedRoute.put('/practitioners', async (req: Request, res: Response) => {
	const practitioner = await updatePractitionerHandler(req);
	res.status(201).json(practitioner).end();
});

authenticatedRoute.get('/pendingPractitioners', async (req: Request, res: Response) => {
	const practitioners = await getPendingPractitionersHandler(req);
	res.status(200).json(practitioners).end();
});

authenticatedRoute.delete('/practitioners', async (req: Request, res: Response) => {
	const response = await deletePractitionerHandler(req);
	res.status(200).json(response);
});

authenticatedRoute.delete('/pendingPractitioners', async (req: Request, res: Response) => {
	const response = await deletePendingPractitionerHandler(req);
	res.status(200).json(response);
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
