import { el } from 'redom';
import './styles.scss'

export const SaveCardLabel = (text: string): HTMLElement => (
    el('label', {
        className: 'payment__save-card'
    }, [
        el('input', {
            className: 'payment__save-card-checkbox',
            name: 'save',
            type: 'checkbox'
        }),
        el('span', {
            className: 'payment__save-card-text'
        }, text)
    ])
)