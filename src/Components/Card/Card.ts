import { el } from 'redom';
import { CreateSavedCard } from './types';


export const Card: CreateSavedCard = ({
    bankLogo, brandLogo, last4, expYear, expMonth
}, dataIndex) => {
    const elements = [
        el('img', {
            className: 'card__bank-logo',
            src: bankLogo
        }),
        el('img', {
            className: 'card__brand-logo',
            src: brandLogo,
            
        }),
        el('div', {
            className: 'card__last4'
        }, last4),
        el('div', {
            className: 'card__exp'
        }, `${expMonth}/${expYear}`)
    ]

    return el('div', {
        className: 'cards_card card',
        'data-index': dataIndex
    }, elements)
}