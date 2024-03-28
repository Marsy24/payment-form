import { el } from 'redom'
import { FCField } from "./types";

export const Field: FCField = (data): HTMLElement => (
    el('input', data)
)