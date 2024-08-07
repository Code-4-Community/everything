import { z } from "zod";

export const Key = z.object({
  uuid: z.string(),
})

export type Key = z.infer<typeof Key>
