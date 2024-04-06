import { ErrorResult } from "./validate"

export const validateEmail = (value: string): ErrorResult => {
    if (!value) return {result: true, errorMsgKey: 'EMAIL_REQUIRED'}
    const result = value
            .toLowerCase()
            .match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) ? true : false;
    const resultWith3Domen = value
            .toLowerCase()
            .match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/i) ? true : false;

    if (!result && !resultWith3Domen) return {result: true, errorMsgKey: 'EMAIL_INVALID'}

    return {result: false}
}