import { getCards } from "../../api/LS";
import { Card } from "./Card";
import { NewCard } from "../NewCard/NewCard";

export const FetchCards = (): HTMLElement[] => {
    const cards = getCards().map((data, index) => Card(data, index))

    if (cards.length > 1) return cards

    cards.push(NewCard());

    return cards;
}