//geistzone
const getBorrowBook = async () => {
    try {
      const res = await fetch("http://localhost:5000/borrows")
      if (res.ok) {
        return await res.json();
      } 
      else throw new Error('Error, cannot get book data')
    } 
    catch (err) {
      console.log(err)
    }
  }

  
  export { getBorrowBook }

