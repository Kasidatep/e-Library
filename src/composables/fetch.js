const fetchPost = async (url) => {
    try {
        
        const res = await fetch(url)
        if (res.status === 200) {
            return await res.json()
        }
        else console.log(res.status)
    }
    catch (err) {
        console.log(err)
    }
}