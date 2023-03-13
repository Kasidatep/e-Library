import userList from '../../../data/db.json'
let user = userList.users
// console.log(user)

// user.forEach(readUser)
const readUser = () =>{
    return user
}
let uId = user.length+1
const createUser = (name,username,email,phone,password) =>{
    const founduser = user.find(user => user.username.toLocaleUpperCase() === username.toLocaleUpperCase())
    if (founduser === undefined) { 
        user.push({ id: uId++ , name: name, username: username, email: email, phone: phone, type: "user", password: password }) 
    } else return 'This username has already been taken'
    
    return user
}
const findUser = (inputusername) =>{
    const founduser = user.find(user => (user.name.toUpperCase() === inputusername.toUpperCase() || user.username === inputusername ))
    return founduser
}
const deleteUser = (username) =>{
    const deleteuser = user.filter(user => user.username !== username)
    user = deleteuser
    return user 
}
const setUser = (finduser, name, username, email, phone, password) =>{
    const founduser = user.find(user => user.username === finduser)
    if(founduser !== undefined){
    const indexuser = user.findIndex(user => user.username === finduser)
    name.length === 0 ? null : user[indexuser].name = name
    username.length === 0 ? null : user[indexuser].username = username
    email.length === 0 ? null : user[indexuser].email = email
    phone.length === 0 ? null : user[indexuser].phone = phone
    password.length === 0 ? null : user[indexuser].password = password
    }
    return user
}
const checkUser = (username, password) =>{
    const checkuser = user.find(user => user.username === username && user.password === password)
    if (checkuser !== undefined) {return {}}
    return undefined
}
console.log(checkUser('permm',''))
console.log(findUser('permm'))
console.log(setUser('permm', 'PERM', '', '', '', 'password'))
console.log(createUser('Tester','test','Test@mail.com','123456','test'))
console.log(createUser('Tester', 'test', 'Test@mail.com', '123456', 'test'))
console.log(deleteUser('test'))


export {readUser,createUser,findUser,deleteUser,setUser,checkUser}