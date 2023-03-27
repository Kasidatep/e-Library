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


const createBook = async (newBook) => {
    try {
        const res = await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook)
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const updateBookById = async (updateBook) => {
    try {
        const res = await fetch(`http://localhost:5000/books/${updateBook.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateBook)
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const deleteBookById = async (deleteId) => {
    try {
        const res = await fetch(`http://localhost:5000/books/${deleteId}`, {
            method: 'DELETE'
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

export { getBooks, deleteBookById, createBook, updateBookById };