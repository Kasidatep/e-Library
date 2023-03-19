const data = {id:25, title:"Hello World", userId:"kasidatep", description:"KasP_Dev", visable:2} 
let posts = [];
const fetchPost = async () => {
    try {
        //http://localhost:5000/posts?_expand=user
        const res = await fetch('http://localhost:5000/posts')
        if (res.status === 200) {
            posts = await res.json()
        }
        else console.log(res.status)
    }
    catch (err) {
        console.log(err)
    }
}

const createPost = async (data) => {
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

const updatePostById = async (id, data) => {
    try {
        const res = await fetch('http://localhost:5000/posts/'+id, {
            method: 'PUT',
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

const deletePostById = async (id) => {
    try {
        const res = await fetch('http://localhost:5000/posts/'+id, {
            method: 'DELETE'
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const getPosts = () => posts
export { fetchPost, getPosts, createPost, updatePostById, deletePostById }