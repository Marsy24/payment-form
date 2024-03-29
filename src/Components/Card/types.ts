import { SavedCard } from "../../api/LS"

export type CreateSavedCard = ({bankLogo, brandLogo, last4, expYear, expMonth}: SavedCard, dataIndex: number) => HTMLElement