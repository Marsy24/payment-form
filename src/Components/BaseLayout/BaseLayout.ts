import { el, setChildren } from 'redom';
import { Layout } from './types';
import { FetchCards } from '../Card/FetchCards';
import { Field } from '../Field/Field';
import { injectElementInArray } from '../../utils/injectElementInArray';
import { SimplyLabel } from '../SimplyLabel/SimplyLabel';
import { SaveCardLabel } from '../SaveCardLabel/SaveCardLabel';
import { Context } from '../../Context/Context';
import { Error } from '../Error/Error';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './styles.scss'
import { Panels } from '../Panels/Panels';

export const BaseLayout: Layout = () => {
    const payment = el('div', {
        className: 'payment',
        id: 'payment'
    }),
        paymentForm = el('form', {
            className: 'payment__form',
            id: 'form'
        });

    setChildren(payment, [paymentForm]);
    setChildren(paymentForm, [
        el('div', {
            className: 'payment__saved-cards',
            id: 'saved-cards'
        },
            el('div', {
                className: 'payment__cards cards',
                id: 'cards'
            }, FetchCards())),
        el('div', {
            className: 'payment__new-card-form',
            id: 'new-card-form'
        }, [
            el('div', {
                className: 'payment__panels panels',
                id: 'panels'
            }, Panels(Context.fields))
        ],
            el('div', {className: 'payment__new-card-form-bottom'},
            [
                el('div', {
                    className: 'payment__email email'
                }, Context.fields.emails.map(email => Field(email))),
                el('div', {
                    className: 'payment__save-card'
                }, SaveCardLabel('Save your card for future payments'))
            ])),
        el('div', {
            className: 'payment__form-bottom',
            id: 'form-bottom'
        }, [
            Error(Context.error),
            Button({
                text: 'Pay',
                handleClick(e) {
                    e.preventDefault();
                },
                type: 'submit'
            })
        ]),
        el('div', {
            className: 'payment__trust-logos',
            id: 'trust-logos'
        }, Object.values(Context.trustLogos)
            .map(logo => Logo(logo)))
    ])

    return payment
}