import { LocationClient, SearchPlaceIndexForTextCommand } from "@aws-sdk/client-location";
import type { GeolocationPosition } from '@c4c/monarch/common';

if (process.env.AWS_ACCESS_KEY_ID == null) {
    throw new Error('AWS Access Key not configured');
}

if (process.env.AWS_SECRET_ACCESS_KEY == null) {
    throw new Error('AWS Secret Access Key not configured');
}

if (process.env.AWS_REGION == null) {
    throw new Error('AWS Region not configured');
}

const client = new LocationClient({
    region: process.env.AWS_REGION,
})

export async function extractGeocode(address: string): Promise<GeolocationPosition> {
    const searchQuery = new SearchPlaceIndexForTextCommand({
        IndexName: 'monarch-place-index',
        Text: address,
        MaxResults: 1,
    });
    const searchResult = await client.send(searchQuery);
    
    if (searchResult.Results.length == 0) {
        return {};
    } else {
        return {
            latitude: searchResult.Results[0].Place.Geometry.Point[1],
            longitude: searchResult.Results[0].Place.Geometry.Point[0],
        };
    }
}