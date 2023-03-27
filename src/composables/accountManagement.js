// import userList from '../../data/db.json'
// let user = userList.users
import { ref } from 'vue'
const readUser = async () => {
  try {
    const user = await fetch('http://localhost:5000/users')
    // if(res.status===201)
    if (user.ok) {
      const users = await user.json()
      console.log(users)
      return users
    } else {
      console.log('cannot get data')
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (newUser) => {
  const user = await fetch('http://localhost:5000/users')
  const users = await user.json()
  if (users.some(user => user.username === newUser.username)) { console.log('This username has already been taken!') } else {
    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          type: newUser.type,
          password: newUser.password
        })
      })
      console.log('create successfully')
      return res.status
    } catch (err) {
      console.log(err)
    }
  }
}

const findUser = async (inputusername) => {
  try {
    const user = await fetch(`http://localhost:5000/users`)
    const users = await user.json()
    const founduser = users.find(user => (user.id === inputusername || user.name === inputusername || user.username === inputusername))
    if (user.ok && founduser !== undefined) {
      console.log(founduser)
      return founduser
    } else {
      console.log(`User with username ${inputusername} not found`)
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (userid) => {
  if (findUser(userid)) {
    try {
      const res = await fetch(`http://localhost:5000/users/${userid}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        console.log('delete successfully')
      } else {
        console.log('cannot delete data!')
      }
    } catch (error) {
      console.log(error)
    }
  } else { `User with id ${userid} not found` }
}

const setUser = async (updateUser) => {
  const user = await fetch(`http://localhost:5000/users`)
  const users = await user.json()
  const founduser = users.find(user => user.username === updateUser.username)
  try {
    if (founduser === undefined) {
      console.log(`User with username ${updateUser.username} not found`)
    }
    else {
      const res = await fetch(`http://localhost:5000/users/${updateUser.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updateUser.id,
          name: updateUser.name,
          username: updateUser.username,
          email: updateUser.email,
          phone: updateUser.phone,
          type: updateUser.type,
          password: updateUser.password
        })
      })
      if (res.status === 200) {
        console.log(`update user ${updateUser.id} successfully`)
        return res.status
      }
    }
  }
  catch (error) { console.log(error) }

}

const checkUser = async (username, password) => {
  const user = await fetch(`http://localhost:5000/users`)
  const users = await user.json()
  const checkuser = users.find(user => user.username === username && user.password === password)
  if (checkuser !== undefined) {
    console.log('login successfully')
    return {}
  } else {console.log('username or password is incorrect')}
}

export { readUser, createUser, deleteUser, findUser, checkUser, setUser }