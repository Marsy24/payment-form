import { el } from 'redom'
import './styles.scss'

export const NewCard = () => {
    return el('button', {
        className: 'cards__card card new-card selected',
        type: 'submit',
        onclick(event: MouseEvent) {
            event.preventDefault();
        }
    }, el('div', {
        className: 'card__label'
    }, [
        el('span', {
            className: 'card__icon'
        }, '+'),
        el('span', {
            className: 'card__text new-card__text'
        }, 'Новая карта')
    ]))
}