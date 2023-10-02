import { z } from "zod";

export const GeolocationPosition = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

export type GeolocationPosition = z.infer<typeof GeolocationPosition>