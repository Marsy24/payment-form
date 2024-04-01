import { el } from 'redom'
import { FCField } from "./types";

export const Field: FCField = (data, onblur, onfocus, oninput): HTMLElement => (
    el('input', data, {
        onblur: onblur,
        onfocus: onfocus,
        oninput: oninput
    })
)