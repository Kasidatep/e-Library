export const getDateFormat = (d) => {
    return d.slice(8,10) + '/' + d.slice(5,7) + '/' + d.slice(0,4)
}