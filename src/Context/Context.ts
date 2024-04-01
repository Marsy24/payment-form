import { IErrorProps } from "../Components/Error/interfaces"
import { TFields } from "../Components/Panels/types"
import { Logos } from "../Components/Logo/types"
import { getLinkLogo } from "../utils/getLinkLogo"


export class Context {
    static fields: TFields = {
        front: [
            {
                type: 'text',
                name: 'cardnumber',
                autocomplete: 'cc-number',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                placeholder: '0000  '.repeat(4).trim(),
                className: 'panel__field-number-card panel__field',
                id: 'card-number-input',
                required: 'true',
                maxLength: 23
            },
            {
                type: 'text',
                name: 'cc-month',
                autocomplete: 'cc-exp-month',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                placeholder: 'MM',
                className: 'panel__date-field panel__month-field panel__field',
                id: 'card-month-input',
                required: 'true',
                maxLength: 2
            },
            {
                type: 'text',
                name: 'cc-year',
                autocomplete: 'cc-exp-year',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                placeholder: 'YY',
                className: 'panel__date-field panel__year-field panel__field',
                id: 'card-year-input',
                required: 'true',
                maxLength: 2
            },
        ],
        back: [
            {
                type: 'password',
                name: 'cvc',
                autocomplete: 'cc-scs',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                placeholder: 'CVV',
                className: 'panel__field-code panel__field',
                id: 'card-scs',
                required: 'true',
                maxLength: 3
            }
        ],
        emails: [
            {
                type: 'email',
                name: 'email',
                autocomplete: 'cc-email',
                inputMode: 'email',
                pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                placeholder: 'Enter your E-mail for check',
                className: 'panel__field-email panel__field',
                id: 'email-input',
                required: 'true',
                maxLength: 30
            }
        ]
    }
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