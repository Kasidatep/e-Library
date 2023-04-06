const getBorrowBook = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/borrows?_expand=book&userId=${userId}`)
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}
const getBorrowBookByUserId = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/borrows?_userId=${userId}`)
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}

const getCurrentBorrowBookByUserId = async (userId, bookId) => {
  try {
    const res = await fetch(`http://localhost:5000/borrows?userId=${userId}&status=1&bookId=${bookId}`)
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}

const getAllBorrowBook = async () => {
  try {
    const res = await fetch(`http://localhost:5000/borrows?_expand=book`)
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}

const getBorrowBookById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/borrows/${id}`)
    if (res.ok) {
      return await res.json();
    }
    else throw new Error('Error, cannot get book data')
  }
  catch (err) {
    console.log(err)
  }
}


const addBrBook = async (newBrBook) => {
 const getBr =await getCurrentBorrowBookByUserId(newBrBook.userId,newBrBook.bookId)
 if(await getBr.length > 0) return 304
  try {
    const res = await fetch('http://localhost:5000/borrows', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBrBook)
    })
    if ( res.status === 201) {
      return res.status

    } else return res.status
  } catch (err) {
    console.log(err)
  }
}

const updateBorrowBook = async (updateBrBook) => {
  const book = await getBorrowBookById(updateBrBook)
  book.status = 2
  book.returnDate = new Date(Date.now())
  try {
    const res = await fetch(`http://localhost:5000/borrows/${updateBrBook}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book)
    })

      // console.log(res.status)
      return res.status  }
  catch (err) {
      console.log(err)
    }
  }

  // const deleteBorrowBook = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:5000/borrows/${id}`, {
//         method: 'DELETE'        })
//     if (res.ok) {
//         brBooks.value = brBooks.value.filter((br) => {
//             return br.id !== id           
//            })
//     } else throw new error('Error, cannot delete data!')
// } catch (error) {
//     console.log(error)
// }
// }

 


export { getBorrowBook, addBrBook, updateBorrowBook,getBorrowBookByUserId,getAllBorrowBook}

