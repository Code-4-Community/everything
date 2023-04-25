import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Practitioner as practitionerSchema } from '@c4c/monarch/common';
import type { Practitioner } from '@c4c/monarch/common';

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('AWS Access Key not configured');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('AWS Secret Access Key not configured');
}
console.log('key', process.env.AWS_ACCESS_KEY_ID);
console.log('secret', process.env.AWS_SECRET_ACCESS_KEY!);

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
