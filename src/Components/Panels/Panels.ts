import { el } from 'redom'
import './styles.scss'
import { FCPanels } from './types.'
import { Field } from '../Field/Field'


export const Panels: FCPanels = (fields) => {
    const frontPanel = el('div', {
        className: 'panels__front-panel front-panel'
    }, [
        el('img', {
            className: 'front-panel__bank-logo hide'
        }),
        el('img', {
            className: 'front-panel__brand-logo hide'
        }),
        el('div', {
            className: 'front-panel__fields fields'
        }, fields.front.map(field => Field(field)))
    ]);

    const backPanel = el('div', {
        className: 'panels__back-panel back-panel'
    }, [
        fields.back.map(field => Field(field)),
        el('label', {
            className: 'back-panel__label-code code'
        }, [
            el('span', {
                className: 'code__security code__text'
            }, 'Security'),
            el('span', {
                className: 'code__code code__text'
            }, 'code')
        ])
    ])

    return [frontPanel, backPanel]
}