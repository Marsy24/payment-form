export const setStateButton = (): void => {
    const inputs = document.querySelectorAll('input'),
          btns = document.querySelectorAll('button'),
          className = 'noClick';
    let isDisable = false;

    for (let i = 0; i < inputs.length; i++) {
        if (document.activeElement === inputs[i]) {
            isDisable = !isDisable
            break;
        }
    }

    btns.forEach(btn => isDisable ? btn.classList.add(className) : btn.classList.remove(className));
}