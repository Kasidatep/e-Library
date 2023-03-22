// import userList from '../../data/db.json'
// let user = userList.users



const checkUser = async (username, password) => {
    try{
    const checkUser = await fetch("http://localhost:5000/users/"+username);
    // const checkuser = user.find(
    // (user) => user.username === username && user.password === password)
        if (checkUser.ok) {
          const user = await checkUser.json();
          const checkusers = user.password === password ? user : "username or password is incorrect"
          return checkusers;
          // return user
        }
    }catch (error) {
        console.log (error)
    }
};

const readUser = async () => {
  try {
    const user = await fetch("http://localhost:5000/users");
    // if(res.status===201)
    if (user.ok) {
      const users = user.json();
      return users;
    } else {
      throw new Error("Error, cannot get data");
    }
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (newUser) => {
  const userList = await readUser()
  const usernameList = await userList.map(user => user.id)
  console.log(usernameList)
  console.log(usernameList.includes(newUser.id))
  
  try {
    if(userList.includes(user => user.id !== newUser.id)) {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        type: newUser.type,
        password: newUser.password,
      }),
    });
    if (res.status === 201) {
      console.log("add successfully");
      const createdUser = await res.json();
    //   createuser.value.push(createdUser);
      console.log(createdUser);
    } else {
      throw new Error("This username has already been taken!");
    }
  }
  } catch (err) {
    console.log(err);
  }
};
// const findUser = (inputusername) =>{
//     const founduser = user.find(user => (user.name.toUpperCase() === inputusername.toUpperCase() || user.username === inputusername ))
//     if(founduser !== undefined){
//         return founduser
//     }else{
//         return `User with username ${inputusername} not found`
//     }
    
// }
const deleteUser =async (userId) =>{
    try{
    const user = await fetch(`http://localhost:5000/users/${userId}`,{
        method: 'DELETE'
    });
    if(user.ok){
     const deleteuser = user.filter((user) => user.userId !== userId);
        return user !== deleteuser;
    }else{
        return `User with user id ${userId} not found`
    }
    }catch(error){
        console.log(error)
    }
}
// const setUser = (finduser, name, username, email, phone, password) =>{
//     const founduser = user.find(user => user.username === finduser)
//     if (founduser === undefined) {
//         return `User with username ${finduser} not found`
//     }
//     if(founduser !== undefined && username !== findUser(username).username){
//     const indexuser = user.findIndex(user => user.username === finduser)
//     name.length === 0 ? null : user[indexuser].name = name
//     username.length === 0 ? null : user[indexuser].username = username
//     email.length === 0 ? null : user[indexuser].email = email
//     phone.length === 0 ? null : user[indexuser].phone = phone
//     password.length === 0 ? null : user[indexuser].password = password
//         return user
//     }else {
//         return 'This username has already been taken!'
//     } 
// }


// console.log(checkUser('permm',''))
// console.log(findUser('permm'))
// console.log(findUser('kkk'))
// console.log(createUser('Tester','test','Test@mail.com','123456','test'))
// console.log(deleteUser('test'))
// console.log(setUser('Bret', 'KAITOON', 'kaitoon', '', '', ''))
// console.log(setUser('permm', 'Perm', 'L5139', '', '', ''))
// console.log(readUser())

export { readUser, checkUser, deleteUser, createUser };
// export {readUser,createUser,findUser,deleteUser,setUser,checkUser}