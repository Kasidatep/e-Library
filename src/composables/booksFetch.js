const getBooks = async () => {
  try {
    const res = await fetch("http://localhost:5000/books");
    if (res.ok) {
      return await res.json();
    } 
    else throw new Error('Error, cannot get book data');
  } 
  catch (err) {
    console.log(err);
  }
};


const createBook = async (data) => {
    console.log(data.postDate)
    try {
        const res = await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const updateBookById = async (id, data) => {
    try {
        const res = await fetch('http://localhost:5000/posts/'+id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        console.log("updated post"+ id)
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const deleteBookById = async (deleteId) => {
    try {
        const res = await fetch(`http://localhost:5000/posts/${deleteId}`, {
            method: 'DELETE'
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

export { getBooks,deleteBookById,createBook,updateBookById };