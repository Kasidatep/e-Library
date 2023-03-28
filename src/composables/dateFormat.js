export const getDateFormat = (d) => {
    const date = new Date(d)
    return date.getDay() + '/' + date.getUTCMonth() + '/' + date.getFullYear()
}