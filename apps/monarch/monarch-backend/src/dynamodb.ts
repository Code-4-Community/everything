import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Practitioner as practitionerSchema, PractitionerInfo as practitionerInfoSchema } from '@c4c/monarch/common';
import type { Key, Practitioner } from '@c4c/monarch/common';
import { Request } from 'express';

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('AWS Access Key not configured');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('AWS Secret Access Key not configured');
}

const client = new DynamoDBClient({ region: 'us-east-2' });

// TODO: Write persitence level test using local DB
// This is kind of a pain, and a "slow" test so we elide it

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
      uuid: req.body.uuid,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
      businessLocation: req.body.businessLocation,
      businessName: req.body.businessName,
      email: req.body.email,
      geocode: req.body.geocode,
      languagesList: req.body.languagesList,
      minAgeServed: req.body.minAgeServed,
      modality: req.body.modality,
      website: req.body.website,
      dateJoined: nowString,
      familiesHelped: 0,
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
