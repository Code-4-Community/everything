// A job that geoencodes user provided addresses to documents in DynamoDB if needed
// 1. Filter by those without a lat/long
// 2. Call AWS Location Service to encode by text
// 3. Take the top result and update the document with it
//
// To be run on demand

//import { scanAllPractitionersWithFilter } from '../dynamodb';

// async function addGeocodes() {
//   const documentsWithoutGeocode = await scanAllPractitionersWithFilter(
//     'attribute_not_exists(geocode)'
//   ); // Get all, filtered by no geocode
//   for (doc of documentsWithoutGeocode) {
//     addGeocodeToDocument(doc);
//   }
//   return 1;
// }

// async function addGeocodeToDocument(doc) {
//   const geocode = 1; // All AWS Location Service
//   const docWithGeocode = doc + 1;
//   // Update item
//   return;
// }
