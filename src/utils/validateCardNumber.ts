export const validateCardNumber = (ccNum: string) => {
    return ccNum.split('').map((item, index) => (
        (index + 1) % 2 === 0
            ? Number(item)
            : Number(item) * 2 > 9
            ? Number(item) * 2 - 9 
                : Number(item) * 2
        ) 
    )
        .reduce((acc, item) => acc + item)
        % 10 === 0
}