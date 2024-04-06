export type TErrors = {
    CARD_NUMBER_REQUIRED: string
    CARD_NUMBER_INCOMPLETE: string
    CARD_NUMBER_LUHN: string
    MONTH_REQUIRED: string
    MONTH_INVALID: string
    YEAR_REQUIRED: string
    YEAR_INVALID: string
    YEAR_IN_PAST: string
    MONTH_IN_PAST: string
    CODE_REQUIRED: string
    EMAIL_REQUIRED: string
    EMAIL_INVALID: string
}

export const errors: TErrors = {
    CARD_NUMBER_REQUIRED: 'Indicate your bank card number',
    CARD_NUMBER_INCOMPLETE: 'Card number entry is incomplete',
    CARD_NUMBER_LUHN: 'Card number entry contains typo',
    MONTH_REQUIRED: 'Indicate card expiry date',
    MONTH_INVALID: 'Error in card expiry date',
    YEAR_REQUIRED: 'Indicate year of card expiry',
    YEAR_INVALID: 'Error in year of card expiry',
    YEAR_IN_PAST: 'Year of card expiry can not be in the past',
    MONTH_IN_PAST: 'Month of card expiry can not be in the past',
    CODE_REQUIRED: 'Please indicate security code',
    EMAIL_REQUIRED: 'Please indicate E-mail',
    EMAIL_INVALID: "E-mail is invalid"
}