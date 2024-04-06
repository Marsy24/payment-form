import { ErrorResult } from "./validate";

export const validateMonth = (value: string): ErrorResult => {
      if (!value.length) return {result: true, errorMsgKey: 'MONTH_REQUIRED'}
      if (value.length === 1) return {result: true, errorMsgKey: 'MONTH_INVALID'};

      const date = new Date(),
            formattedValue = value.charAt(0) === '0' ? Number(value.replace(value.charAt(0), '')) : Number(value);

      const month = date.getMonth() + 1;

      const result = month <= formattedValue;

      if (!result) return {result: true, errorMsgKey: 'MONTH_IN_PAST'}
      
      if (formattedValue > 12) return {result: true, errorMsgKey: 'MONTH_INVALID'}

      return {result: false}
}