export type TDictionaryBanks = {
    [key: string]: string
}

export const fromKeyToPath = (isBrand: boolean, isBig?: boolean, isInverted?: boolean, isSvg?: boolean, key?: string | null): string => {
    const pathBrandLogo = './brands-logos/',
          pathBankLogo = './banks-logos/',
          DictionaryBanks: TDictionaryBanks = {
            'JSCB ROSBANK': 'ru-rosbank',
            'TINKOFF BANK': 'ru-tinkoff',
            'SAVINGS BANK OF THE RUSSIAN FEDERATION (SBERBANK)': 'ru-sberbank',
          }
    
    let resultPath = '';
    
    
    if (isBrand) 
        isInverted 
            ? resultPath = `${pathBrandLogo}${key !== null ? key : ''}-inverted.${isSvg ? 'svg' : 'png'}`
            : resultPath = `${pathBrandLogo}${key !== null ? key : ''}-original.${isSvg ? 'svg' : 'png'}`

    for (const [keyDictionary, value] of Object.entries(DictionaryBanks)) {
        if (keyDictionary === key) {
            isInverted
                ? resultPath = `${pathBankLogo}${value}-${isBig ? 'big' : 'small'}-inverted.${isSvg ? 'svg' : 'png'}`
                : resultPath = `${pathBankLogo}${value}-${isBig ? 'big' : 'small'}-original.${isSvg ? 'svg' : 'png'}`
        }
    }

    return resultPath;
}