//geistzone
const findByCatagory = (catagory,books) => {
    return books.filter(book => book.maincatagory === catagory)
}


const getDateFormat = (date) => {
    return date
}


export {findByCatagory}
