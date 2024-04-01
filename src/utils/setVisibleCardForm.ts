export const setVisibleCardForm = (isVisile: boolean) => {
    const cardForm = document.getElementById('new-card-form');
    if (!isVisile) {
        cardForm!.style.opacity = '0';
        cardForm!.style.height = '0';
        return
    }

    cardForm!.style.opacity = '1';
    cardForm!.style.height = '310px';
}