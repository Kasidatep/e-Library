// import userList from '../../data/db.json'


const getUser = async () => {
  try {
    const user = await fetch('http://localhost:5000/users')
    // if(res.status===201)
    if (user.ok) {
      const users = await user.json()
      return users
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (newUser) => {
  const users = await getUser();
  if (
    users.some((user) => user.id === newUser.username) || 
    newUser.password != newUser.confpassword ||
    newUser.username.length === 0) 
        {console.log("This username has already been taken or password not match!");
        return 'usernameinuse'
  } else {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: newUser.username,
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          type: newUser.type,
          password: newUser.password,
          image: newUser.image,
        }),
      });
      if (res.status === 201 
        ) {
        const created = await res.json();
        return created;
      }else {
        return {}
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const findUser = async (inputusername) => {
  if (inputusername === null) { return false }
  try {
    const users = await getUser();
    const founduser = users.find(user => (user.id === inputusername || user.name === inputusername || user.username === inputusername))
    if ( founduser !== undefined) {
      return founduser
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (userid) => {
  if (findUser(userid)) {
    try {
              const res = await fetch(
                `http://localhost:5000/users/${userid}`,
                {
                  method: "DELETE",
                }
              );
      if (res.ok) {
        return {}

      } else {
      }
    } catch (error) {
      console.log(error)
    }
  } else { `User with id ${userid} not found` }
}

const updateUser = async (updateUser) => {
  const users = await getUser()
  const founduser = users.find(user => user.username === updateUser.username)
  try {
    if (founduser === undefined) {
      console.log(`User with username ${updateUser.username} not found`)
    }
    else {
      const res = await fetch(
        `http://localhost:5000/users/${updateUser.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updateUser.username,
            username: updateUser.username,
            name: updateUser.name,
            email: updateUser.email,
            phone: updateUser.phone,
            type: updateUser.type,
            password: updateUser.password,
            image: updateUser.image,
          }),
        }
      );
      if (res.status === 200) {
        console.log(`update user ${updateUser.username} successfully`);
        const updated = await res.json();
        return updated;
      }
    }
  }
  catch (error) { console.log(error) }

}

const checkUser = async (id, password) => {
  const users = await getUser();
  const checkuser = users.find(user => user.id === id && user.password === password)
  if(checkuser === undefined){return false}else{
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`)
    if(res.status === 404){
      console.log("username or password is incorrect")
    }
    if (checkuser !== undefined && res.ok) {
      const ress = await res.json()
      return ress
    } else {  
  }
  } catch (error) {
    console.log(error)
  }}
}
const clearUser =()=>{
  return {}
}
const updateType =async(userid)=>{
  const usr = await findUser(userid)

  const typeObj = usr.type==='user'?{type: "librarian"}:{type: "user"}
  try {
      const res = await fetch(`http://localhost:5000/users/${userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(typeObj),
      });
      if (res.status === 200) {
        const updated = await res.json();
        return res.status
      }
    
  }
  catch (error) { console.log(error) }
}

export {
  getUser,
  createUser,
  deleteUser,
  findUser,
  checkUser,
  updateUser,
  clearUser,
  updateType
};