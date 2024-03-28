import { SavedCard } from "./types";

export const getCards = (key: string = 'cards'): SavedCard[] => {
    const dataCards = localStorage.getItem(key);

    return dataCards ? JSON.parse(dataCards) as SavedCard[] : [];
}

export const storeCard = (card: SavedCard, key: string = 'cards') => {
    const data = getCards(key);

    if(SavedCard.parse(card)) data.push(card)

    localStorage.setItem(key, JSON.stringify(data));
}