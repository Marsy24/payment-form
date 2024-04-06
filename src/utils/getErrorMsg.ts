import { errors } from "./errors";

export const getErrorMsg = (value: string): string => {
    for (const [key, msg] of Object.entries(errors)) {
        if (key === value) return msg;
    }

    return ''
}