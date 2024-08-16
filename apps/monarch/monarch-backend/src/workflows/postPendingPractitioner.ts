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
const FIELD_NAMES = {
  PHONE: 'q4_contact_number',
  WEBSITE: 'q26_website',
  MODALITY: 'q24_modality',
  BUSINESS_LOCATION: 'q6_business_location',
  BUSINESS_NAME: 'q32_business_name',
  MIN_AGE_SERVED: 'q30_min_age_served',
  EMAIL: 'q5_email',
  FULL_NAME: 'q3_full_name',
  LANGUAGES: 'q29_languages'
}

function getPractitionerInfo(webhookRequest): Omit<PractitionerInfo, 'uuid'> {
  const practitionerInfo: PractitionerInfo = {};
  // Get full name
  
  console.log(webhookRequest);

  practitionerInfo.phoneNumber = webhookRequest[FIELD_NAMES.PHONE]['full'];
  practitionerInfo.website = webhookRequest[FIELD_NAMES.WEBSITE] || '';
  practitionerInfo.businessName = webhookRequest[FIELD_NAMES.BUSINESS_NAME] || '';
  // Even though this is a number input, we still receive it as a string
  practitionerInfo.minAgeServed = parseInt(webhookRequest[FIELD_NAMES.MIN_AGE_SERVED] || 0)
  practitionerInfo.email = webhookRequest[FIELD_NAMES.EMAIL];
  practitionerInfo.fullName = `${webhookRequest[FIELD_NAMES.FULL_NAME].first} ${webhookRequest[FIELD_NAMES.FULL_NAME].last}`;
  practitionerInfo.languagesList = webhookRequest[FIELD_NAMES.LANGUAGES].split('\r\n')

  const modalities = webhookRequest[FIELD_NAMES.MODALITY].split('\r\n')
  practitionerInfo.modality = modalities.join(', ');

  const rawAddress = webhookRequest[FIELD_NAMES.BUSINESS_LOCATION];
  // e.g. 123 Main Street, Boston, MA 123456
  practitionerInfo.businessLocation = `${rawAddress['addr_line1']} ${rawAddress['city']}, ${rawAddress['state']} ${rawAddress['postal']}}`;

  return practitionerInfo;
}

export default postNewPendingPractitioner;

/*
Sample Response
{
  slug: 'submit/242187627833161',
  jsExecutionTracker: 'build-date-1723594885399=>init-started:1723594885035=>validator-called:1723594885037=>validator-mounted-true:1723594885037=>init-complete:1723594885041=>interval-complete:1723594906008=>onsubmit-fired:1723594965460=>submit-validation-passed:1723594965463=>direct-validation-passed:1723594965546',
  submitSource: 'direct',
  buildDate: '1723594885399',
  q4_contactNumber: { full: '(111) 111-1111' },
  q18_typeA: 'French',
  q5_emailAddress: 'test@gmail.com',
  q26_text: 'what difference does it make',
  q6_address: {
    addr_line1: '123 Main Street',
    addr_line2: 'Secondary Address',
    city: 'Boston',
    state: 'MA',
    postal: '02120'
  },
  q3_name_entry: { first: 'First', last: 'Last' },
  q27_dropdown: '',
  q29_typeA29: 'Option 2\r\nOption 3',
  q24_multipicker: 'A\r\nB',
  q30_aNumber: '100',
  event_id: '1723594885035_242187627833161_jEQTyc8',
  timeToSubmit: '20',
  validatedNewRequiredFieldIDs: '{"new":1,"id_3":"La"}',
  visitedPages: '{"1":true,"2":true}',
  path: '/submit/242187627833161'
}
*/