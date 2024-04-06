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
import { setFocus } from '../../utils/setFocus';
import { ITips, initTips } from '../../utils/initTips';
import { validate } from '../../utils/validate';
import { Instance, hideAll } from 'tippy.js';
import { storeCard } from '../../api/LS';
import { getLast4nums } from '../../utils/getLast4nums';
import './styles.scss'
import 'tippy.js/dist/tippy.css';

let tips: ITips;

document.addEventListener('DOMContentLoaded', () => {
    tips = initTips(document.querySelectorAll('input:not([name="save"])'), {
        trigger: 'manual',
        hideOnClick: false,
        theme: 'custom',
        animation: 'scale'
    })
})


export const BaseLayout: Layout = () => {
    const handleBlurInputs = (e: Event): void => {
        setStateButton()
        const target = e.target as HTMLInputElement,
              name = target.getAttribute('name');

        if (name) {
            const tipsInput = tips[name] as Instance;
            validate([tipsInput]);
        }
    }

    const handleFocusInputs = (e: Event): void => {
        setStateButton()
    }

    const handleClickSavedCard = (isClickOnSavedCard: boolean, e: Event) => {
        if (!isClickOnSavedCard) return;
        e.preventDefault()
        hideAll()
        const cardTarget = e.target as HTMLButtonElement;
        const cards = document.querySelectorAll('.card') as NodeListOf<HTMLButtonElement>;
        const currentClick = cardTarget.closest('.card');
            
        cards.forEach(card => card.classList.remove('selected'))

        currentClick?.classList.add('selected');

        setVisibleCardForm(currentClick!.classList.contains('new-card'));
    }

    const handleClickCheckbox = (isClickOnCheckbox: boolean, e: Event): void => {
        if (!isClickOnCheckbox) return;

        const target = document.querySelector('.payment__save-card-checkbox') as HTMLInputElement;

        target.getAttribute('checked') === 'true' ? target.removeAttribute('checked') : target.setAttribute('checked', 'true');
    }

    const handleClickPayButton = (isClickOnPayButton: boolean, e: Event): void => {
        if (!isClickOnPayButton) return;

        if (!validate(Object.values(tips), false)) {
            document.getElementById('error')!.style.display = 'block'
            setFocus(tips)
            return;
        };

        if (document.querySelector('.payment__save-card-checkbox')!.getAttribute('checked') === 'true') {
            const bankLogoSrc = document.querySelector('.front-panel__bank-logo')!.getAttribute('src')?.replace('big', 'small').replace('inverted', 'original') as string,
              brandLogoSrc = document.querySelector('.front-panel__brand-logo')!.getAttribute('src')?.replace('inverted', 'original') as string;

            storeCard({
                bankLogo: bankLogoSrc,
                brandLogo: brandLogoSrc,
                last4: getLast4nums((tips['cardnumber']?.reference as HTMLInputElement).value),
                expYear: Number((tips['cc-year']?.reference as HTMLInputElement).value),
                expMonth: Number((tips['cc-month']?.reference as HTMLInputElement).value)
            })

            document.getElementById('saved-cards')!.innerHTML = '';

            FetchCards().map(card => document.getElementById('saved-cards')?.append(card))
            document.getElementById('error')!.style.display = 'none'
        }
    }

    const handleClickForm = (e: Event): void => {
        const target = e.target as Element,
              isClickOnSavedCard = target.closest('.card') && !target.closest('.card')?.classList.contains('noClick') ? true : false,
              isClickOnCheckbox = target.getAttribute('name') === 'save'  ? true : false,
              isClickOnPayButton = target.classList.contains('pay') ? true : false;
        
        handleClickSavedCard(isClickOnSavedCard, e);
        handleClickCheckbox(isClickOnCheckbox, e);
        handleClickPayButton(isClickOnPayButton, e);
    }

    const handleCardNumberInput = (target: HTMLInputElement): void => {
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

        const tipsCardNumber = tips['cardnumber'] as Instance;
        tipsCardNumber.hide();

        if (unmaskCard(value).length >= 16) {
            setFocus(tips)
        };
    }

    const handleDateInputs = (target: HTMLInputElement): void => {
        const isMonth = target.getAttribute('name') === 'cc-month' ? true : false;

        const tipsDate = isMonth ? tips['cc-month'] as Instance : tips['cc-year'] as Instance;
        tipsDate.hide();

        if (target.value.length === 2) {
            if (validate([tipsDate])) setFocus(tips)
        }
    }

    const handleCVCInput = (target: HTMLInputElement): void => {
        const key = target.getAttribute('name') as string,
              tipsCVC = tips[key] as Instance;
        
        
        if (target.value.length === 3) {
            if (validate([tipsCVC])) {tipsCVC.hide(); setFocus(tips);}
        }
    }

    const handleEmailInput = (target: HTMLInputElement): void => {
        const key = target.getAttribute('name') as string,
              tipsEmail = tips[key] as Instance;
        tipsEmail.hide();

        if (target.value.length > 15) {
            if (validate([tipsEmail])) {
                setFocus(tips)
            }
        }
    }

    const handleInput = (e: Event): void => {
        const inputTarget = e.target as HTMLInputElement;
        const reg = /\D/g

        if (inputTarget.getAttribute('name') !== 'email' && inputTarget.getAttribute('name') !== 'cardnumber')
            inputTarget.value = inputTarget.value.replace(reg, '');

        if (validate(Object.values(tips), false)) {
            const button = document.querySelector('.pay') as HTMLButtonElement;

            button.removeAttribute('disabled')
        }
        
        switch (inputTarget.getAttribute('name')) {
            case 'cardnumber':
                handleCardNumberInput(inputTarget);
                break;
            case 'cc-year':
            case 'cc-month':
                handleDateInputs(inputTarget);
                break;
            case 'cvc':
                handleCVCInput(inputTarget);
                break;
            case 'email':
                handleEmailInput(inputTarget);
                break;
        }
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