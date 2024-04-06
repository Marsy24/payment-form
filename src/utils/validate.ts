import { Instance } from "tippy.js";
import { getErrorMsg } from "./getErrorMsg";
import { setError } from "./setError";
import { validateCardNumber } from "./validateCardNumber"
import { validateMonth } from "./validateMonth";
import { validateYear } from "./validateYear";
import { validateEmail } from "./validateEmail";
export type ErrorResult = {
    result: boolean,
    errorMsgKey?: string
}

export const validate = (instances: Instance[], setErr: boolean = true) => {
    let isNotError = true;
    instances.forEach(instance => {
        let resultVal,
            element = instance.reference as HTMLInputElement;
    
        if (element.getAttribute('name') === 'cardnumber') {
            resultVal = validateCardNumber(element.value);

            if (resultVal.result && resultVal.errorMsgKey) {
                if (setErr) setError(resultVal.result, instance, getErrorMsg(resultVal.errorMsgKey))
                isNotError = false;
            }
        }

        if (element.getAttribute('name') === 'cc-month') {
            resultVal = validateMonth(element.value);

            if (resultVal.result && resultVal.errorMsgKey) {
                if (setErr) setError(resultVal.result, instance, getErrorMsg(resultVal.errorMsgKey), "left");
                isNotError = false;
            }
        }

        if (element.getAttribute('name') === 'cc-year') {
            resultVal = validateYear(element.value);
            if (resultVal.result && resultVal.errorMsgKey) {
                if (setErr) setError(resultVal.result, instance, getErrorMsg(resultVal.errorMsgKey), "bottom");
                isNotError = false;
            }
        }

        if (element.getAttribute('name') === 'cvc') {
            if (element.value.length < 3) {
                if (setErr) setError(true, instance, getErrorMsg('CODE_REQUIRED'));
                isNotError = false;
            }
        }

        if (element.getAttribute('name') === 'email') {
            resultVal = validateEmail(element.value)

            if (resultVal.result && resultVal.errorMsgKey) {
                if (setErr) setError(resultVal.result, instance, getErrorMsg(resultVal.errorMsgKey), "right")
                isNotError = false;
            }
        }
    })

    return isNotError;
}