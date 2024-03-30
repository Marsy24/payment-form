import { el } from "redom"
import { TSimplyLabel } from "./types";
import './styles.scss'

export const SimplyLabel = ({text, className}: TSimplyLabel): HTMLElement => (
    el('label', {className}, text)
)