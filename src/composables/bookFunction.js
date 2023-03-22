//geistzone
const findByCatagory = (catagory,books) => {
    return books.filter(book => book.maincatagory === catagory)
}


export {findByCatagory}
