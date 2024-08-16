import { DynamoDBClient, ScanCommand, PutItemCommand, UpdateItemCommand, GetItemCommand, DeleteItemCommand, ReturnValue, AttributeValue, UpdateTimeToLiveCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Practitioner as practitionerSchema, PractitionerInfo as practitionerInfoSchema, PractitionerInfo } from '@c4c/monarch/common';
import { Key, Practitioner } from '@c4c/monarch/common';
import { Request } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
import { extractGeocode } from './location';
import { randomUUID } from 'crypto';

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('AWS Access Key not configured');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('AWS Secret Access Key not configured');
}

const client = new DynamoDBClient({ region: 'us-east-2' });

// TODO: Write persitence level test using local DB
// This is kind of a pain, and a "slow" test so we elide it`

// Validates and extracts practitioner data from a request bdoy
function practitionerDataFromBody(request: Request, schema, keyPrefix = '') {
  const parsedBody = schema.parse(request.body)
  // List of fields on Practitioner model
  const practitionerProperties = schema.keyof().options;
  const pairs = practitionerProperties.map(prop => [keyPrefix + prop, parsedBody[prop]])

  return Object.fromEntries(pairs);
}

export async function scanAllPractitioners(): Promise<Practitioner[]> {
  const command = new ScanCommand({
    TableName: 'PractitionersV2',
  });
  const dynamoRawResult = await client.send(command);
  if (dynamoRawResult == null || dynamoRawResult.Items == null) {
    throw new Error('Invalid response from DynamoDB, got undefined/null');
  }
  const unmarshalledItems = dynamoRawResult.Items.map((i) => unmarshall(i));

  const practitioners = unmarshalledItems.map((i) =>
    practitionerSchema.parse(i)
  );
  return practitioners;
}

export async function scanPendingPractitioners(): Promise<Practitioner[]> {
  const command = new ScanCommand({
    TableName: 'PendingPractitionersV2',
  });
  const dynamoRawResult = await client.send(command);
  if (dynamoRawResult == null || dynamoRawResult.Items == null) {
    throw new Error('Invalid response from DynamoDB, got undefined/null');
  }
  const unmarshalledItems = dynamoRawResult.Items.map((i) => unmarshall(i));

  const practitioners = unmarshalledItems.map((i) =>
    practitionerInfoSchema.parse(i)
  );
  return practitioners;
}

export async function postPractitioner(req: Request): Promise<Practitioner> {
  const now = new Date(Date.now());
  // getMonth() returns 0-indexed month values (i.e. january is 0)
  const monthString = String(now.getMonth() + 1).padStart(2, '0');
  const dayString = String(now.getDate()).padStart(2, '0');
  const nowString = `${now.getFullYear()}-${monthString}-${dayString}`;

  const parameters = {
    TableName: 'PractitionersV2',
    Item: marshall({ 
      ...practitionerDataFromBody(req, practitionerInfoSchema), 
      dateJoined: nowString,
      familiesHelped: 0 
    }),
  };

  const command = new PutItemCommand(parameters);
  await client.send(command);

  const newItemParameters = {
    TableName: 'PractitionersV2',
    Key: {
      uuid: { "S": req.body.uuid }
    },
  }

  const getCommand = new GetItemCommand(newItemParameters);
  const practitioner = await client.send(getCommand);

  return practitionerSchema.parse(unmarshall(practitioner.Item));
}

export async function postPendingPractitioner(webhookData: Omit<PractitionerInfo, 'uuid'>): Promise<PractitionerInfo> {
  const uuid = randomUUID();
  const geocode = await extractGeocode(webhookData.businessLocation);

  const parameters = {
    TableName: 'PendingPractitionersV2',
    Item: marshall({
      ...webhookData,
      uuid,
      geocode: {
        lat: geocode.latitude,
        long: geocode.longitude,
      }
    })
  };

  const command = new PutItemCommand(parameters);
  await client.send(command);

  const newItemParameters = {
    TableName: 'PendingPractitionersV2',
    Key: {
      uuid: { "S": uuid }
    },
  }

  const getCommand = new GetItemCommand(newItemParameters);
  const pendingPractitioner = await client.send(getCommand);

  console.log(pendingPractitioner);

  return practitionerInfoSchema.parse(unmarshall(pendingPractitioner.Item));
}

export async function updatePractitioner(req: Request): Promise<Practitioner> {
  // Remove UUID from list of fields since we cannot update that it (and shouldn't, anyways)
  const practitionerKeys = Practitioner.omit({ uuid: true }).keyof().options;
  // Prefix with ':' to use as expression attribute values
  const practitionerData = practitionerDataFromBody(req, practitionerSchema.omit({ uuid: true }), ':');

  // Map keys to expression e.g. "phoneNumber" => "phoneNumber=:phoneNumber"
  const updateExpression = `SET ${practitionerKeys.map(k => `${k} = :${k}`).join(', ')}`
  const updateItemParameters = {
    TableName: 'PractitionersV2',
    Key: {
      uuid: { "S": req.body.uuid }
    },
    ExpressionAttributeValues: marshall(practitionerData),
    UpdateExpression: updateExpression,
    ReturnValues: ReturnValue.ALL_NEW,
  }

  const updateCommand = new UpdateItemCommand(updateItemParameters)
  const { Attributes: updatedAttributes } = await client.send(updateCommand);

  return practitionerSchema.parse(unmarshall(updatedAttributes));
}

export async function deletePractitioner(req: Request): Promise<Key> {
  const parameters = {
    TableName: 'PractitionersV2',
    Key: {
      uuid: { S: req.body.uuid },
    },
  };

  const command = new DeleteItemCommand(parameters);
  await client.send(command);

  return { uuid: req.body.uuid };
}

export async function deletePendingPractitioner(req: Request): Promise<Key> {
  const parameters = {
    TableName: 'PendingPractitionersV2',
    Key: {
      uuid: { S: req.body.uuid },
    },
  };

  const command = new DeleteItemCommand(parameters);
  await client.send(command);

  return { uuid: req.body.uuid };
}
