import { ErrorResult } from "./validate";

export const validateYear = (value: string): ErrorResult => {
    if (!value.length) return {result: true, errorMsgKey: 'YEAR_REQUIRED'}
    if (value.length === 1) return {result: true, errorMsgKey: 'YEAR_INVALID'};

    const date = new Date(),
          formattedValue = value.charAt(0) === '0' ? Number(value.replace(value.charAt(0), '')) : Number(value);

    const year = String(date.getFullYear()),
    replacedYear = Number(year.replace(`${year.charAt(0)}${year.charAt(1)}`, ''));

    const result = formattedValue < replacedYear

    if (result) {
        return {result: true, errorMsgKey: 'YEAR_IN_PAST'}
    }

    return {result: false}
}