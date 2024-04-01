import { TFullPaymentInfo, TMinPaymentInfo, getPaymentInfo } from "./getPaymentsInfo";
interface HTMLElements {
    brandLogo: HTMLImageElement,
    bankLogo: HTMLImageElement,
    frontPanel: HTMLDivElement
}
export type FSetStateFrontPanel = (length: number, value: string, valuePaymentNumbers: () => string, {brandLogo, bankLogo, frontPanel}: HTMLElements) => void

export const setStateFrontPanel: FSetStateFrontPanel = (length: number, value: string, valuePaymentNumbers, {brandLogo, bankLogo, frontPanel}) => {
    if (length <= 2) {
        const info = getPaymentInfo(valuePaymentNumbers()) as TMinPaymentInfo;

        if (info.results.minResult && info.paths.brandLogoPath) {
            brandLogo.src = info.paths.brandLogoPath;
            brandLogo.classList.remove('hide');
            return
        }

        brandLogo.classList.add('hide');
    }

    if (length >= 6) {
        const info = getPaymentInfo(value.replace(/[^\d]/g, ''), true) as Promise<TFullPaymentInfo>

        info.then(data => {
            if (
                data.success && data.results.fullResult &&
                data.color && data.paths.bankLogoPath && data.paths.brandLogoPath
            ) {
                frontPanel.style.background = data.color;
                bankLogo.src = data.paths.bankLogoPath;
                brandLogo.src = data.paths.brandLogoPath;
                bankLogo.classList.remove('hide');
                brandLogo.classList.remove('hide');
            }
        })
    } else if (length < 6) {
        frontPanel.style.background = '#eee'
        bankLogo.classList.add('hide');
        brandLogo.src = brandLogo.src.replace('inverted', 'original');
    }
}