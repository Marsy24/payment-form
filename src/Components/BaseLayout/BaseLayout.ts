import { el, setChildren } from 'redom';
import { Layout } from './types';
import { FetchCards } from '../Card/FetchCards';
import { Field } from '../Field/Field';
import { SaveCardLabel } from '../SaveCardLabel/SaveCardLabel';
import { Context } from '../../Context/Context';
import { Error } from '../Error/Error';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Panels } from '../Panels/Panels';
import { setVisibleCardForm } from '../../utils/setVisibleCardForm';
import { setStateButton } from '../../utils/setStateButton';
import { maskCard } from '../../utils/maskCard';
import { setStateFrontPanel } from '../../utils/setStateFrontPanel';
import { unmaskCard } from '../../utils/unmaskCard';
import './styles.scss'
import { validateCardNumber } from '../../utils/validateCardNumber';

export const BaseLayout: Layout = () => {
    const handleClickSavedCard = (isClickOnSavedCard: boolean, e: Event) => {
        if (!isClickOnSavedCard) return;
        const cardTarget = e.target as HTMLButtonElement;
        const cards = document.querySelectorAll('.card') as NodeListOf<HTMLButtonElement>;
        const currentClick = cardTarget.closest('.card');
            
        cards.forEach(card => card.classList.remove('selected'))

        currentClick?.classList.add('selected');

        setVisibleCardForm(currentClick!.classList.contains('new-card'));
    }

    const handleClickForm = (e: Event) => {
        e.preventDefault();
        const target = e.target as Element;

        handleClickSavedCard(target.closest('.card') && !target.closest('.card')?.classList.contains('noClick') ? true : false, e);
    }

    const handleBlurInputs = (e: Event): void => {
        setStateButton()
    }

    const handleFocusInputs = (e: Event): void => {
        setStateButton()
    }

    const handleCardNumberInput = (target: HTMLInputElement) => {
        let value: string = target.value;
        const brandLogo = document.querySelector('.front-panel__brand-logo') as HTMLImageElement,
              bankLogo = document.querySelector('.front-panel__bank-logo') as HTMLImageElement,
              frontPanel = document.querySelector('.front-panel.panel') as HTMLDivElement,
              length = unmaskCard(value).length,
              valuePaymentNumbers = (): string => {
                switch (length) {
                    case 1:
                        return `${value[0]}`
                    case 2:
                        return `${value[0]}${value[1]}`
                }
                return '0'
              }
        
        target.value = maskCard(unmaskCard(target.value), 4, ' ');
        setStateFrontPanel(length, value, valuePaymentNumbers, {bankLogo, brandLogo, frontPanel})

        if (length >= 16 && validateCardNumber(unmaskCard(value))) document.getElementById('card-month-input')?.focus()
    }

    const handleInput = (e: Event): void => {
        const inputTarget = e.target as HTMLInputElement;
        const reg = /\D/g

        if (inputTarget.getAttribute('name') !== 'email' 
        && inputTarget.getAttribute('name') !== 'cardnumber') inputTarget.value = inputTarget.value.replace(reg, '')

        if (inputTarget.getAttribute('name') === 'cardnumber') handleCardNumberInput(inputTarget)
    }

    const payment = el('div', {
        className: 'payment',
        id: 'payment'
    }),
        paymentForm = el('form', {
            className: 'payment__form',
            id: 'form',
            onclick: handleClickForm
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
            }, Panels(Context.fields, handleBlurInputs, handleFocusInputs, handleInput))
        ],
            el('div', {className: 'payment__new-card-form-bottom'},
            [
                el('div', {
                    className: 'payment__email email'
                }, Context.fields.emails.map(email => Field(email, handleBlurInputs, handleFocusInputs, handleInput))),
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