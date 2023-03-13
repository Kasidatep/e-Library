import userList from '../../../data/db.json'
let user = userList.users

const readUser = () =>{
    return user
}
let uId = user.length+1
const createUser = (name,username,email,phone,password) =>{
    const founduser = user.find(user => user.username.toLocaleUpperCase() === username.toLocaleUpperCase())
    if (founduser === undefined) { 
        user.push({ id: uId++ , name: name, username: username, email: email, phone: phone, type: "user", password: password })
        return user
    } else return 'This username has already been taken!'  
}
const findUser = (inputusername) =>{
    const founduser = user.find(user => (user.name.toUpperCase() === inputusername.toUpperCase() || user.username === inputusername ))
    if(founduser !== undefined){
        return founduser
    }else{
        return `User with username ${inputusername} not found`
    }
    
}
const deleteUser = (username) =>{
    const deleteuser = user.filter(user => user.username !== username)
    if (user.find(user => user.username === username)){
        user = deleteuser
        return user
    }else{
        return `User with username ${username} not found`
    }
}
const setUser = (finduser, name, username, email, phone, password) =>{
    const founduser = user.find(user => user.username === finduser)
    if (founduser === undefined) {
        return `User with username ${finduser} not found`
    }
    if(founduser !== undefined && username !== findUser(username).username){
    const indexuser = user.findIndex(user => user.username === finduser)
    name.length === 0 ? null : user[indexuser].name = name
    username.length === 0 ? null : user[indexuser].username = username
    email.length === 0 ? null : user[indexuser].email = email
    phone.length === 0 ? null : user[indexuser].phone = phone
    password.length === 0 ? null : user[indexuser].password = password
        return user
    }else {
        return 'This username has already been taken!'
    } 
}
const checkUser = (username, password) =>{
    const checkuser = user.find(user => user.username === username && user.password === password)
    if (checkuser !== undefined) {
        return {}
    }
    return 'username or password is incorrect'
}

console.log(checkUser('permm',''))
console.log(findUser('permm'))
console.log(findUser('kkk'))
console.log(createUser('Tester','test','Test@mail.com','123456','test'))
console.log(deleteUser('test'))
console.log(setUser('Bret', 'KAITOON', 'kaitoon', '', '', ''))
console.log(setUser('permm', 'Perm', 'L5139', '', '', ''))
console.log(readUser())


export {readUser,createUser,findUser,deleteUser,setUser,checkUser}