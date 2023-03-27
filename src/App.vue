<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import Navbar from './components/Navbar.vue';
import BookList from './components/BookList.vue';
import AllPost from './components/AllPost.vue';
import Profile from './components/Profile.vue'
import { themeUpdate, getTheme } from './composables/theme'
import { getPosts } from './composables/announcementAndPosts'
import { getBooks } from './composables/booksFetch.js'
import LogIn from './components/LogIn.vue';
import Register from './components/Register.vue';
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser } from '../src/composables/accountManagement.js'

const theme = ref(getTheme())
const posts = ref()
const user = ref({})
const showLogIn = ref(false)
const showRegister = ref(false)
console.log(user)
const login = async (userlogin) => {
  user.value = await userlogin
  showLogIn.value = false
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



</script>
 
<template>
  <div :class="theme.bgbase">
    <div>
      <Navbar @changeTheme="updateTheme($event)" @goProfile="isHomePage = !isHomePage" :theme="theme" />
      <div class="flex absolute left-auto right-0">
        <div class="bg-white text-black p-24" @click="showLogIn = !showLogIn, showRegister = false">Log In</div>
      <div class="bg-yellow-300 text-black p-24" @click="showRegister = !showRegister, showLogIn = false">Register</div>
        </div>
      
    </div>

    <div class="fixed w-2/3 mx-auto h-2/3 rounded-xl z-20 bg-opacity-90 bg-blur overflow-auto p-5" :class="theme.bgblock"
      v-if="showLogIn">
      <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">Log In </h1>
      <LogIn @login="login" />
    </div>
    <div class="fixed w-2/3 mx-auto h-2/3 rounded-xl z-20 bg-opacity-90 bg-blur overflow-auto p-5" :class="theme.bgblock"
      v-if="showRegister">
      <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">Register In </h1>
      <Register @register="register" />
    </div>
    <AllPost :posts="posts" v-if="0" />
    <div>
      <BookList :theme="theme" v-if="isHomePage" :books="books" />

      <Profile :theme="theme" v-if="!isHomePage" :posts="posts" />

    </div>


  </div>
</template>
 
<style scoped></style>