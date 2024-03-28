import { SavedCard } from "../../api/types"

export type CreateSavedCard = ({bankLogo, brandLogo, last4, expYear, expMonth}: SavedCard) => HTMLElement