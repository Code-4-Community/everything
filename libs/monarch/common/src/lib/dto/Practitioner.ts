import { z } from "zod";

export const PractitionerInfo = z.object({
  uuid: z.string(),
  phoneNumber: z.string(),
  website: z.string(),
  modality: z.string(),
  businessLocation: z.string(),
  businessName: z.string(),
  minAgeServed: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  languagesList: z.array(z.string()),
  geocode: z.object({
    lat: z.number(),
    long: z.number(),
  }),
})

export const Practitioner = PractitionerInfo.extend({
  dateJoined: z.string(),
  familiesHelped: z.number()
})

export type PractitionerInfo = z.infer<typeof PractitionerInfo>
export type Practitioner = z.infer<typeof Practitioner>
