import { el } from "redom"
import { TSimplyLabel } from "./types";

export const SimplyLabel = ({text, className}: TSimplyLabel): HTMLElement => (
    el('label', {className}, text)
)