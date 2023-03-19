<script setup>
import {ref,computed} from 'vue'
import Navbar from './components/Navbar.vue';
import BookList from './components/BookList.vue';
import Profile from './components/Profile.vue'
import {themeUpdate, getTheme} from './composables/theme' 
import {getPosts, fetchPost} from './composables/announcementAndPosts'
const theme = ref(getTheme())
const updateTheme = (e) => { theme.value=themeUpdate(e)}
const isHomePage = ref(false)
</script>
 
<template>
  <div :class="theme.bgbase">
    <div>
      <Navbar @changeTheme="updateTheme($event)"  @goProfile="isHomePage = !isHomePage" :theme="theme" />
    </div>
    <div>
      <BookList :theme="theme" v-if="isHomePage" />
      <Profile :theme="theme" v-if="!isHomePage" />
    </div>
  </div>
</template>
 
<style scoped>
</style>