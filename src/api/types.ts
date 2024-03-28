import { z } from 'zod';
/*export type Card = {
    bankLogo: string,
    brandLogo: string,
    last4: string,
    expYear: number,
    expMonth: number
}*/

export const SavedCard = z.object({
    bankLogo: z.string(),
    brandLogo: z.string(),
    last4: z.string().max(4, `Максимум 4 цифры`).min(4, `Минимум 4 цифры`),
    expYear: z.number().max(2,`2 цифры`).min(2,`2 цифры`),
    expMonth: z.number().max(2,`2 цифры`).min(2,`2 цифры`)
})

export type SavedCard = z.infer<typeof SavedCard>