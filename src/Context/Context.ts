import { IErrorProps } from "../Components/Error/interfaces"
import { TFields } from "../Components/Panels/types."
import { Logos } from "../Components/Logo/types"
import { getLinkLogo } from "../utils/getLinkLogo"


export class Context {
    static fields: TFields = {front: [
        {
            type: 'text',
            name: 'cardnumber',
            autocomplete: 'cc-number',
            inputMode: 'numeric',
            pattern: '[0-9]*',
            placeholder: '0000'.repeat(4),
            className: 'payment__filed-number-card',
            id: 'card-number-input'
        },
        {
            type: 'text',
            name: 'cc-month',
            autocomplete: 'cc-exp-month',
            inputMode: 'numeric',
            pattern: '[0-9]*',
            placeholder: 'MM',
            className: 'payment__date-field payment__month-field',
            id: 'card-month-input'
        },
        {
            type: 'text',
            name: 'cc-year',
            autocomplete: 'cc-exp-year',
            inputMode: 'numeric',
            pattern: '[0-9]*',
            placeholder: 'YY',
            className: 'payment__date-field payment__year-field',
            id: 'card-year-input'
        },
    ],
    back: [
        {
            type: 'password',
            name: 'cvc',
            autocomplete: 'cc-scs',
            inputMode: 'numeric',
            pattern: '[0-9]*',
            placeholder: '',
            className: 'payment__field-code',
            id: 'card-scs'
        }
    ]} // переделать TFields на интерфейс
    static error: IErrorProps = {
        tag: 'p',
        text: 'Check your inputs',
        className: 'payment__error error hide',
        id: 'error'
    }
    static trustLogos: Logos = {
        secureConnection: {
            className: 'payment__trust-logos secure',
            alt: 'Secure-Connection Image',
            src: getLinkLogo('secure-connection')
        },
        masterCard: {
            className: 'payment__trust-logos mastercard',
            alt: 'Masctercard Image',
            src: getLinkLogo('mastercard')
        },
        mir: {
            className: 'payment__trust-logos mir',
            alt: 'Mir Image',
            src: getLinkLogo('mir')
        },
        visa: {
            className: 'payment__trust-logos',
            alt: 'Visa Image',
            src: getLinkLogo('visa')
        },
        pciDss: {
            className: 'payment__trust-logos',
            alt: 'Pc-Dss Image',
            src: getLinkLogo('pci-dss')
        }
    }
}