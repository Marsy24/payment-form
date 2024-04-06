import { el } from 'redom'
import { Button as TButton } from "./types";
import './styles.scss'

export const Button: TButton = ({ 
    text,
    handleClick, 
    type
}) => {
    return el('button', {
        className: 'payment__btn-pay btn-reset pay',
        type: type,
        disabled: 'disabled',
        onclick: handleClick,
    }, text)
}