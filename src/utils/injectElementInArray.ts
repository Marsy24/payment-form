export const injectElementInArray = (arr: HTMLElement[], el: HTMLElement, index: number): HTMLElement[] => {
    return arr.slice(0, index)
        .concat(el, arr.slice(index));
}