export const unmaskCard = (value: string): string => {
    return value.replace(/[^\d]/g, '')
} 