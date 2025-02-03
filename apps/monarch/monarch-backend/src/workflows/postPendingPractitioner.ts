import { Practitioner, PractitionerInfo } from "@c4c/monarch/common";
import { Request } from "express";

async function postNewPendingPractitioner(req: Request, postPendingPractitioner: (webhookData: Omit<PractitionerInfo, 'uuid'>) => Promise<Practitioner>) {
    try {
        const extractedPractitionerInfo = getPractitionerInfo(JSON.parse(req.body.rawRequest));
        return postPendingPractitioner(extractedPractitionerInfo);
    } catch (e) {
        console.log(e);
        throw new Error("Unable to post pending practitioner");
    }
}

// List of field names for JotForm submission request objects
// const FIELD_NAMES = {
//   PHONE: 'q4_contact_number',
//   WEBSITE: 'q26_website',
//   MODALITY: 'q24_modality',
//   BUSINESS_LOCATION: 'q6_business_location',
//   BUSINESS_NAME: 'q32_business_name',
//   MIN_AGE_SERVED: 'q30_min_age_served',
//   EMAIL: 'q5_email',
//   FULL_NAME: 'q3_full_name',
//   LANGUAGES: 'q29_languages'
// }

const FIELD_NAMES = {
  PHONE: 'q6_contact_number',
  WEBSITE: 'q9_website',
  MODALITY: 'q12_modality',
  BUSINESS_LOCATION: 'q11_business_location',
  BUSINESS_NAME: 'q8_business_name',
  MIN_AGE_SERVED: 'q18_min_age_served',
  EMAIL: 'q5_email',
  FULL_NAME: 'q4_full_name',
  LANGUAGES: 'q52_languages'
}

function getPractitionerInfo(webhookRequest): Omit<PractitionerInfo, 'uuid'> {
  const practitionerInfo: PractitionerInfo = {};
  console.info('Webhook request:', webhookRequest);

  practitionerInfo.phoneNumber = webhookRequest[FIELD_NAMES.PHONE]['full'];
  practitionerInfo.website = webhookRequest[FIELD_NAMES.WEBSITE] || '';
  practitionerInfo.businessName = webhookRequest[FIELD_NAMES.BUSINESS_NAME] || '';
  // Even though this is a number input, we still receive it as a string
  practitionerInfo.minAgeServed = parseInt(webhookRequest[FIELD_NAMES.MIN_AGE_SERVED] || 0);
  practitionerInfo.email = webhookRequest[FIELD_NAMES.EMAIL];
  practitionerInfo.fullName = `${webhookRequest[FIELD_NAMES.FULL_NAME].first} ${webhookRequest[FIELD_NAMES.FULL_NAME].last}`;
  practitionerInfo.languagesList = ['English'].concat(webhookRequest[FIELD_NAMES.LANGUAGES].split('\r\n'));

  practitionerInfo.modality = webhookRequest[FIELD_NAMES.MODALITY].join(', ');
  
  const rawAddress = webhookRequest[FIELD_NAMES.BUSINESS_LOCATION];
  // e.g. 123 Main Street, Boston, MA 123456
  practitionerInfo.businessLocation = `${rawAddress['addr_line1']} ${rawAddress['city']}, ${rawAddress['state']} ${rawAddress['postal']}`;

  return practitionerInfo;
}

export default postNewPendingPractitioner;
