export const maskCard = (value: string, limit: number, separator: string): string => {
    const output = [];
    for (let i = 0; i < value.length; i++) {
        if (i !== 0 && i % limit === 0) output.push(separator);
        output.push(value[i]);
    }

    return output.join('');
}