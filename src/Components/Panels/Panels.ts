import { el } from 'redom';
import { FCPanels } from './types.';
import { Field } from '../Field/Field';
import { Context } from '../../Context/Context';
import { injectElementInArray } from '../../utils/injectElementInArray';
import { SimplyLabel } from '../SimplyLabel/SimplyLabel';
import './styles.scss';



export const Panels: FCPanels = (fields) => {
    const frontPanel = el('div', {
        className: 'panels__front-panel front-panel panel'
    }, [
        el('img', {
            className: 'front-panel__bank-logo hide'
        }),
        el('img', {
            className: 'front-panel__brand-logo hide'
        }),
        el('div', {
            className: 'front-panel__fields fields'
        }, injectElementInArray(
            Context.fields.front.map(field => Field(field)),
            SimplyLabel({ text: 'Valid through', className: 'panel__front-label' }),
            1
        ))
    ]);

    const backPanel = el('div', {
        className: 'panels__back-panel back-panel panel'
    }, [
        fields.back.map(field => Field(field)),
        el('label', {
            className: 'panel__label-code code'
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