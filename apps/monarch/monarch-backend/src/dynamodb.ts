import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Practitioner as practitionerSchema } from '@c4c/monarch/common';
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
    TableName: 'Practitioners',
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
    TableName: 'PendingPractitioners',
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

export async function postPractitioner(req: Request): Promise<Practitioner> {
  const parameters = {
    TableName: 'Practitioners',
    Item: marshall({
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
      businessLocation: req.body.businessLocation,
      businessName: req.body.businessName,
      email: req.body.email,
      geocode: {
        lat: 0,
        long: 0,
      },
      languagesList: req.body.languagesList,
      minAgeServed: req.body.minAgeServed,
      modality: req.body.modality,
      website: req.body.website
    }),
  };

  const command = new PutItemCommand(parameters);
  await client.send(command);

  const newItemParameters = {
    TableName: 'Practitioners',
    Key: {
      phoneNumber: {
        "S": req.body.phoneNumber,
      },
      fullName: {
        "S": req.body.fullName,
      },
    },
  }

  const getCommand = new GetItemCommand(newItemParameters);
  const practitioner = await client.send(getCommand);

  return practitionerSchema.parse(unmarshall(practitioner.Item));
}

export async function deletePractitioner(req: Request): Promise<Key> {
  const parameters = {
    TableName: 'Practitioners',
    Key: {
      phoneNumber: { S: req.body.phoneNumber },
      fullName: { S: req.body.fullName },
    },
  };

  const command = new DeleteItemCommand(parameters);
  await client.send(command);

  return { phoneNumber: req.body.phoneNumber, fullName: req.body.fullName };
}

export async function deletePendingPractitioner(req: Request): Promise<Key> {
  const parameters = {
    TableName: 'PendingPractitioners',
    Key: {
      phoneNumber: { S: req.body.phoneNumber },
      fullName: { S: req.body.fullName },
    },
  };

  const command = new DeleteItemCommand(parameters);
  await client.send(command);

  return { phoneNumber: req.body.phoneNumber, fullName: req.body.fullName };
}
