import { z } from "zod";

export const SimplyLabelSchema = z.object({
    text: z.string(),
    className: z.string()
})

export type TSimplyLabel = z.infer<typeof SimplyLabelSchema>