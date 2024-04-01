import { el } from 'redom'
import './styles.scss'

export const NewCard = () => {
    return el('button', {
        className: 'cards__card card new-card selected btn-reset',
        type: 'submit'
    }, el('div', {
        className: 'new-card__label'
    }, [
        el('span', {
            className: 'new-card__icon'
        }, '+'),
        el('span', {
            className: 'card__text new-card__text'
        }, 'Новая карта')
    ]))
}