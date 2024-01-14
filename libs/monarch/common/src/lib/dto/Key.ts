import { z } from "zod";

export const Key = z.object({
  phoneNumber: z.string(),
  fullName: z.string(),
})

export type Key = z.infer<typeof Key>
