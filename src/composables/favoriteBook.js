const getFavoriteBookById= async (userId)=>{
    try {
        const res = await fetch(`http://localhost:5000/favorites?_expand=book&userId=${userId}`)
        if (res.ok) {
          return await res.json();
        }
        else throw new Error('Error, cannot get book data')
      }
      catch (err) {
        console.log(err)
      }
    }


export {getFavoriteBookById}