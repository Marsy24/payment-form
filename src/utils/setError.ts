import { Instance, Placement } from "tippy.js";

export const setError = (hasError: boolean, instance: Instance, msg?: string, position?: Placement): void => {
    const attr = 'data-tippy-content';
    if (hasError && msg) {
        if (position) {
            instance.setProps({
                placement: position
            })
        }
        instance.reference.setAttribute(attr, msg);
        instance.setContent(msg);
        instance.show();
        return;
    }

    instance.reference.removeAttribute(attr);
    instance.hide();
}