export type TProps = {
    text: string,
    handleClick: (e: MouseEvent) => void,
    type?: string
}

export type Button = ({ text, handleClick, type }: TProps) => HTMLElement