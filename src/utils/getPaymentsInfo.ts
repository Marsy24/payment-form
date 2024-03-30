export type TPaymentsSystems = {
    [key: string]: TPaymentInfo
}

export type TPaymentInfo = {
    nums: number[],
    path: FPaymentPathImg
}

export type PaymentInfo = {
    payment: string,
    path: FPaymentPathImg | FErrorFindPath,
    result: boolean
}

export const paymentsSystems: TPaymentsSystems = {
    mir: {
        nums: [2],
        path: getPath()
    },
    'diners club': {
        nums: [30, 36, 38],
        path: getPath()
    },
    'jcb international': {
        nums: [31, 35],
        path: getPath()
    },
    'american express': {
        nums: [34, 37],
        path: getPath()
    },
    visa: {
        nums: [4],
        path: getPath()
    },
    mastercard: {
        nums: [51, 52, 53, 54, 55],
        path: getPath()
    },
    maestro: {
        nums: [50, 56, 57, 58, 63, 67],
        path: getPath()
    },
    discover: {
        nums: [60],
        path: getPath()
    },
    'china unionpay': {
        nums: [62],
        path: getPath()
    }
}

export type FPaymentPathImg = (key: string, isOriginal: boolean, isPng: boolean) => string
export type FErrorFindPath = () => string

function fromKeyToPath(key: string): string {
    return key.replace(' ', '-');
}

function getPath(): FPaymentPathImg {
    return (key: string, isOriginal: boolean = true, isPng: boolean = true) => {
        if (!key.length) return 'Key is not defined'

        const path = './brands-logos/';
        return isOriginal 
        ? `${path}${fromKeyToPath(key)}-original.${isPng ? 'png' : 'svg'}`
        : `${path}${fromKeyToPath(key)}-inverted.${isPng ? 'png' : 'svg'}`
    }

}

function paySysInfo (this: TPaymentsSystems, ccNum: number): PaymentInfo {
    const paymentInfo: PaymentInfo = {
        payment: '',
        path: () => 'No information found',
        result: false
    }

    if (!ccNum || ccNum < 2) return paymentInfo


    for (const [key, value] of Object.entries(this)) {
        value.nums.find(item => {
            if (item === ccNum) {
                paymentInfo.payment = key;
                paymentInfo.path = value.path,
                paymentInfo.result = !paymentInfo.result
            }
        })
    }
    
    return paymentInfo;
}

const getPaymentsInfo = paySysInfo.bind(paymentsSystems)

export { getPaymentsInfo }