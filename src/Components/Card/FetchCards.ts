import { getCards } from "../../api/api";
import { Card } from "./Card";
import { NewCard } from "../NewCard/NewCard";

export const FetchCards = (): HTMLElement[] => {
    const cards = getCards().map(data => Card(data))

    if (cards.length > 1) return cards

    cards.push(NewCard());

    return cards;
}