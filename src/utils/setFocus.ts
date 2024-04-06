import { Instance } from "tippy.js";
import { ITips } from "./initTips";
import { validate } from "./validate";

export const setFocus = (tips: ITips): void => {
    for (let i = 0; i < Object.values(tips).length; i++) {
        const instance = Object.values(tips)[i] as Instance

        if (!validate([instance], false)) {
            (instance.reference as HTMLElement).focus();
            break;
        } else {
            (document.querySelector('.pay')! as HTMLButtonElement).focus()
        }
    }
}