import { z } from "zod";

export const SavedCard = z.object({
    bankLogo: z.string(),
    brandLogo: z.string(),
    last4: z.string().max(4, `Максимум 4 цифры`).min(4, `Минимум 4 цифры`),
    expYear: z.number().max(2,`2 цифры`).min(2,`2 цифры`),
    expMonth: z.number().max(2,`2 цифры`).min(2,`2 цифры`)
})

export type SavedCard = z.infer<typeof SavedCard>

export const getCards = (key: string = 'cards'): SavedCard[] => {
    const dataCards = localStorage.getItem(key);

    return dataCards ? JSON.parse(dataCards) as SavedCard[] : [];
}

export const storeCard = (card: SavedCard, key: string = 'cards') => {
    const data = getCards(key);

    if(SavedCard.parse(card)) data.push(card)

    localStorage.setItem(key, JSON.stringify(data));
}

