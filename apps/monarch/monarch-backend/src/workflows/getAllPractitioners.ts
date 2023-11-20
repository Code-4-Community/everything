/**
 * A Practitioner is a Object of the shape:

 {
    "phoneNumber": "123456789",
    "website": "https://ryanjung.dev",
    "languagesList": "French",
    "modality": "Software",
    "businessLocation": "Boston, MA",
    "businessName": "Code4Community",
    "minAgeServed": 18,
    "email": "myemail@gmail.com",
    "fullName": "Ryan Jung"
  }

 */

import { Practitioner } from '@c4c/monarch/common';

/**
 * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
 */
async function getAllPractitioners(
  scanAllPractitioners: () => Promise<Practitioner[]>
) {
  try {
    return scanAllPractitioners();
  } catch (e) {
    console.error(e);
    throw new Error('Could not get practitioners');
  }
}

export default getAllPractitioners;
