import tippy, { DefaultProps, Instance } from "tippy.js"

export interface ITips {
    [attrName: string]: Instance
}

export const initTips = (elements: NodeListOf<Element>, propsTippy: Partial<DefaultProps>): ITips => {
    tippy.setDefaultProps(propsTippy);

    return Array.from(elements).reduce((acc: ITips, item) => {
        const attrName = item.getAttribute('name');

        if (attrName) acc[attrName] = tippy(item);
        return acc;
    }, {})
}