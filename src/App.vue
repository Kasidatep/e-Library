<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import Navbar from './components/Navbar.vue';
import {RouterView} from 'vue-router'
import { themeUpdate, getTheme } from './composables/theme'
import { getPosts } from './composables/announcementAndPosts'
import { getBooks } from './composables/booksFetch.js'
import LogIn from './components/LogIn.vue';
import Register from './components/Register.vue';
import Edituser from './components/Edituser.vue';
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser, clearUser } from '../src/composables/accountManagement.js'

const theme = ref(getTheme())
const posts = ref()
const user = ref({})
const showLogIn = ref(false)
const showRegister = ref(false)
console.log(user)
console.log(user.value)
const login = async (userlogin) => {
  const usr = await userlogin
  if(await usr?.id===undefined) {
    createNotification("warning", "Username or Password is incorrect", 2500) 
    user.value = {}
  }
  else {createNotification("success", "Login Success from App", 2500)
  user.value = await userlogin
  showLogIn.value = false}
}
const logout = async (userlogout) => {
  createNotification("warning", "Logout Success", 2500)
  user.value = await userlogout
}

const register = async (e)=>{
  const usr = await e
  console.log(await usr)
  if(await usr === 'passnotmatch'){ 
    createNotification("warning", "Password not match", 2500)
    showLogIn.value = false
    showRegister.value = true
  }
   if(await usr === 'usernameisnull') {
    createNotification("warning", "Please entry username try again", 2500)
    showLogIn.value = false
    showRegister.value = true
}
 if (await usr === 'passwordisnull'){
    createNotification("warning", "Please entry password try again", 2500)
    showLogIn.value = false
    showRegister.value = true
}
if (await usr === 'usernameinuse') {
    createNotification("warning", "Username already been taken", 2500)
    showLogIn.value = false
    showRegister.value = true
  } 
   if (await usr.username !== undefined && await usr.password !== undefined) { createNotification("success", "Register Success from App", 2500)
  showLogIn.value=true
  showRegister.value=false}
}
provide('theme', theme)
const updateTheme = (e) => { theme.value = themeUpdate(e) }
const isHomePage = ref(false)

// Users



// Book Fetch ---------------------------------------------------------------------------------------------
const books = ref([])
onMounted(async () => {
  books.value = await getBooks(),
    posts.value = await getPosts()

})
provide('user', user)
// Notification -----------------------------------------------------------------------------------
let notifications = ref([])
const createNotification = (type, message, timeout) => {
  let theme = ["bg-black", "text-white"]
  if (type == "warning") theme = ["bg-yellow-500", "text-black"]
  if (type == "success") theme = ["bg-green-500", "text-black"]
  if (type == "danger") theme = ["bg-red-500", "text-white"]
  notifications.value.push({ type: type, message: message, theme: theme })
  setTimeout(removeNotification, timeout)
}

const removeNotification = () => {
  notifications.value.shift()
}

const showProfile = () => {
  if (user.value?.id === undefined) {
    showLogIn.value = true
  } 
}
</script>
 
<template>

  <div :class="theme.bgbase">
    <div class="fixed w-96 right-5 left-auto z-50 mt-24">
        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 mb-2 pr-2">{{ notification.message }}</div>
        </div>
    </div>
    <Navbar @changeTheme="updateTheme($event)" @goProfile="showProfile" />
    <div>

      <!--Pop Up -->
      <div class="w-screen h-screen bg-opacity-70 fixed bg-blur pt-24 z-30" :class="theme.bgbase"
        v-if="showLogIn || showRegister">
        <div
          class="w-4/5 md:w-2/3 flex-col h-3/5 bg-opacity-90 justify-center mx-auto mt-auto mb-auto rounded-xl z-20  overflow-auto p-5"
          :class="theme.bgblock">
          <div class="flex justify-between">
            <h1 class="font-bold text-4xl pt-5" :class="theme.textheader"> {{ showLogIn ? 'Log In' : 'Register' }} </h1>
            <div class="cursor-pointer border-2 h-fit p-2 rounded-full" :class="theme.text"
              @click="() => { showLogIn = false, showRegister = false }">ClOSE</div>
          </div>

          <LogIn @login="login" @toRegister="() => { showRegister = !showRegister, showLogIn = false }"
            v-if="showLogIn" />
          <Register @register="register" @toLogIn="() => { showLogIn = !showLogIn, showRegister = false }" v-if="showRegister" />
          <Profile />
        </div>
      </div>
     
      <RouterView @logout="logout" />
    </div>

  </div>
</template>
 
<style scoped></style>