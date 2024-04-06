import { BINChecker, BINChekerResponse } from "../api/Bin"
import { fromKeyToPath } from "./fromKeyToPath"

export type TDictionaryPayments = {
    [key: string]: RegExp[]
}

export type TDictionaryBanksColor = {
    [key: string]: string
}

export type TPaths = {
    brandLogoPath: string | null,
    bankLogoPath: string | null
}

export type Results = {
    minResult: boolean,
    fullResult: boolean
}

export type TMinPaymentInfo = {
    nameLocalPayment: string | null,
    nameLocalBank: string | null,
    paths: TPaths,
    color: string | null,
    results: Results
}

export type TFullPaymentInfo = TMinPaymentInfo & BINChekerResponse;

export const DictionaryPayments: TDictionaryPayments = {
    mir: [/^2/],
    'diners-club': [/^30/, /^36/, /^38/],
    'jcb': [/^31/, /^35/],
    'american-express': [/^34/, /^37/],
    visa: [/^4/],
    mastercard: [/^51/, /^52/, /^53/, /^54/, /^55/],
    maestro: [/^50/, /^56/, /^57/, /^58/, /^63/, /^67/],
    discover: [/^60/],
    unionpay: [/^62/]
}

export const DictionaryBanksColor: TDictionaryBanksColor = {
    'JSCB ROSBANK': 'linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(139,58,58,1) 49%, rgba(255,0,0,1) 100%)',
    'TINKOFF BANK': 'rgb(254,221,44)',
    'SAVINGS BANK OF THE RUSSIAN FEDERATION (SBERBANK)': 'rgb(70,150,63)'
}

function paySysInfo(this: TDictionaryPayments, ccNum: string, withBin?: boolean): TMinPaymentInfo | Promise<TFullPaymentInfo>  {
    const minPaymentInfo: TMinPaymentInfo = {
        nameLocalPayment: null,
        nameLocalBank: null,
        paths: {
            bankLogoPath: null,
            brandLogoPath: null,
        },
        color: null,
        results: {
            minResult: false,
            fullResult: false
        }
    }

    for (const [key,value] of Object.entries(this)) {
        value.forEach(item => {
            if (item.test(ccNum)) {
                minPaymentInfo.nameLocalPayment = key
                minPaymentInfo.paths.brandLogoPath = fromKeyToPath(true, false, false, false, key)
                minPaymentInfo.results.minResult = true;
            }
        })
    }

    if (withBin) {
        return BINChecker(ccNum)
            .then(data => {
                if (!data.success) return {...data, ...minPaymentInfo}
                
                for (const [key, value] of Object.entries(DictionaryBanksColor)) {
                    if (key === data.BIN.issuer.name) {
                        minPaymentInfo.color = value;
                        break;
                    }
                }

                minPaymentInfo.paths.bankLogoPath = fromKeyToPath(true, true, true, false, data.BIN.issuer.name)
                minPaymentInfo.paths.brandLogoPath = minPaymentInfo.paths.brandLogoPath ? minPaymentInfo.paths.brandLogoPath.replace('original', 'inverted') : '';
                minPaymentInfo.results.fullResult = true;
                return {...data, ...minPaymentInfo}
        })
    }

    return minPaymentInfo;
}

export const getPaymentInfo = paySysInfo.bind(DictionaryPayments)