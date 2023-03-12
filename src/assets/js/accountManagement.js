import userList from '../../../data/db.json'
const user = userList.users
user.forEach(readUser)
const readUser = () =>{
    return user
}
const uId = user.length+1
const createUser = (name,username,email,phone,password) =>{
    return user.push({id: uId++, name: name, username:username, email: email, phone: phone,type: "user", password: password})
}
const findUser = (name, username) =>{
    const founduser = user.find(user => user.name === name || user.username === username)
    return founduser
}
const deleteUser = (username) =>{
    const deleteuser = user.find(user => user.username === username)
    return user = !deleteuser
}
const setUser = (id, name, username, email, phone, password) =>{
    const founduser = user.find(user => user.id === id)
    if(founduser !== undefined){user.push({name: name, username: username, email: email, phone: phone, password: password })}
    return user
}
const checkUser = (username, password) =>{
    const checkuser = user.find(user => user.username === username && user.password === password)
    if (checkuser !== undefined) {return {}}
    return undefined
}
export {readUser,createUser,findUser,deleteUser,setUser,checkUser}