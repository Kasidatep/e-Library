import bookList from '../../../data/db.json'
const books = bookList.books
console.log(books)
const findByCatagory = (catagory) => {
    return books.filter(book => book.maincatagory === catagory)
}
export {findByCatagory}
