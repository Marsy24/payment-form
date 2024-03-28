import { el } from "redom";
import { TLogo } from "./types";

export const Logo: TLogo = ({
    className,
    src,
    alt,
}) => (
    el('img', {
        className,
        src,
        alt
    })
)