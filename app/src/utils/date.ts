
export const today = () => {
    const date = new Date;
    const month = (date.getMonth()+1).toString().padStart(2, '0'); // singleDigits[currMonth] || currMonth+1;
    const day = date.getDate().toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`
}
