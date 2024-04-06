export const setVisibleCardForm = (isVisile: boolean) => {
    const cardForm = document.getElementById('new-card-form'),
          payButton = document.querySelector('.pay') as HTMLButtonElement;
    if (!isVisile) {
        cardForm!.style.opacity = '0';
        cardForm!.style.height = '0';
        setTimeout(() => {
            cardForm!.style.display = 'none';
            document.getElementById('form-bottom')!.style.paddingTop = '15px'
        }, 350);// ВААКХАНАЛИЯ ДЛЯ ФИКСА z-index..... Надо было лучше верстать-_-
        payButton.disabled = false;
        
        return
    }

    new Promise((resolve) => {
        cardForm!.style.display = 'flex';
        document.getElementById('form-bottom')!.style.paddingTop = '0';
        payButton.disabled = true;
        resolve('')
    }).then(() => {
        setTimeout(() => {
            cardForm!.style.opacity = '1';
            cardForm!.style.height = '350px';
            
        }, 0);
    }) // ВААКХАНАЛИЯ ДЛЯ ФИКСА z-index..... Надо было лучше верстать-_-
}