import { TMinPaymentInfo, getPaymentInfo } from "./getPaymentsInfo"
import { unmaskCard } from "./unmaskCard";
import { ErrorResult } from "./validate";

export const validateCardNumber = (value: string): ErrorResult => {
    if (!value) return {result: true, errorMsgKey: 'CARD_NUMBER_REQUIRED'}
    
    const ccNum = unmaskCard(value);
    if (!(getPaymentInfo(ccNum) as TMinPaymentInfo).results.minResult) return {result: true, errorMsgKey: 'CARD_NUMBER_LUHN'};
    if (ccNum.length <= 15) return {result: true, errorMsgKey: 'CARD_NUMBER_INCOMPLETE'}
    if (ccNum.length === 16) {
        const result = ccNum.split('').map((item, index) => (
            (index + 1) % 2 === 0
                ? Number(item)
                : Number(item) * 2 > 9
                ? Number(item) * 2 - 9 
                    : Number(item) * 2
            ) 
        )
            .reduce((acc, item) => acc + item)
            % 10 === 0
            
        if (!result) return {result: true, errorMsgKey: 'CARD_NUMBER_LUHN'}
        else return {result: false}
    }
    
    return {result: false};
}