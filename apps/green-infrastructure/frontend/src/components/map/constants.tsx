import { Loader } from '@googlemaps/js-api-loader';

const MAP_ID = '76c08a2450c223d9';

export const LOADER = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  libraries: ['places'],
  mapIds: [MAP_ID],
});