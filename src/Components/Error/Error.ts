import { el } from "redom";
import { TError } from "./types";
import './styles.scss'

export const Error: TError = ({
    tag,
    className,
    id,
    text
}) => (
    el(tag, {
        className,
        id
    }, text)
)