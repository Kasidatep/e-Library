<script setup>
import {ref, computed, provide, onMounted} from 'vue'
import Navbar from './components/Navbar.vue';
import BookList from './components/BookList.vue';
import AllPost from './components/AllPost.vue';
import Profile from './components/Profile.vue'
import {themeUpdate, getTheme} from './composables/theme' 
import {getPosts} from './composables/announcementAndPosts'
import {getBooks, updateBookById, createBook, deleteBookById} from './composables/booksFetch.js'
const theme = ref(getTheme())
const posts = ref()
provide('theme', theme)
const updateTheme = (e) => { theme.value=themeUpdate(e)}
const isHomePage = ref(false)
// PoST Fetch ---------------------------------------------------------------------------------------------

// Book Fetch ---------------------------------------------------------------------------------------------
const books = ref([])


onMounted(async () => {
  books.value = await getBooks(),
  posts.value = await getPosts()
})


</script>
 
<template>
  <div :class="theme.bgbase">
    <div>
      <Navbar @changeTheme="updateTheme($event)"  @goProfile="isHomePage = !isHomePage" :theme="theme" />
    </div>
    <AllPost :posts="posts" v-if="0"/>
    <div>
      <BookList :theme="theme" v-if="isHomePage" :books="books" />
      
      <Profile :theme="theme" v-if="!isHomePage" :posts="posts" :books="books"/>
    
    </div>
  </div>
</template>
 
<style scoped>
</style>