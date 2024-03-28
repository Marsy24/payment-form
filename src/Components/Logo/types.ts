import { ILogoProps } from "./interfaces";

export type Logos = {
    [key: string]: ILogoProps
}

export type TLogo = (data: ILogoProps) => HTMLElement