<script setup>
import {ref} from 'vue'
import Navbar from './components/Navbar.vue';
import BookList from './components/BookList.vue';
import Profile from './components/Profile.vue'
const themeDark = {
  bgbase: "bg-[#121212]",
  textheader: "text-gray-50",
  text: "text-gray-100",
  bgblock: "bg-[#2A2B2D]",
  bgnav: "bg-[#2A2B2D]",
  bgbutton: "bg-gray-100",
  button: ['bg-emerald-500', 'text-white'],
  lable: ['bg-rose-500', 'text-white'],
  input: ['bg-gray-200', 'text-white'],
  profilebutton: ['bg-gray-800','bg-opacity-50', 'text-gray-300'],
  activebutton: ['bg-puple-800','bg-opacity-50', 'text-white']
}

const themeNight = {
  bgbase: "bg-gray-700",
  textheader: "text-gray-50",
  text: "text-gray-100",
  bgblock: "bg-gray-800",
  bgnav: "bg-gray-900",
  bgbutton: "bg-gray-100",
  button: ['bg-emerald-500', 'text-white'],
  lable: ['bg-rose-500', 'text-white'],
  input: ['bg-gray-200', 'text-white'],
  profilebutton: ['bg-gray-400','bg-opacity-40', 'text-gray-300'],
  activebutton: ['bg-rose-800','bg-opacity-50', 'text-white']
}

const themeSepia = {
  bgbase: "bg-[#B69A52]",
  textheader: "text-gray-50",
  text: "text-gray-50",
  bgblock: "bg-[#563F03]",
  bgnav: "bg-[#563F03]",
  bgbutton: "bg-gray-100",
  button: ['bg-[#D4C398]', 'text-gray-800'],
  lable: ['bg-emerald-600', 'text-white'],
  input: ['bg-gray-200', 'text-white'],
  profilebutton: ['bg-[#563F03]','bg-opacity-70', 'text-white'],
  activebutton: ['bg-rose-500','bg-opacity-50', 'text-white']
}

const themeBright = {
  bgbase: "bg-white",
  textheader: "text-gray-900",
  text: "text-white",
  bgblock: "bg-gray-500",
  bgnav: "bg-gray-700",
  bgbutton: "bg-gray-100",
  button: ['bg-emerald-600', 'text-white'],
  lable: ['bg-rose-500', 'text-white'],
  input: ['bg-gray-200', 'text-white'],
  profilebutton: ['bg-gray-700','bg-opacity-70', 'text-white'],
  activebutton: ['bg-rose-500','bg-opacity-50', 'text-white']
}

const theme = ref(themeDark)

const updateTheme = (e) => {
  console.log(e)
  if(e == 'dark') theme.value=themeDark
  if(e == 'bright') theme.value=themeBright
  if(e == 'sepia') theme.value=themeSepia
  if(e == 'night') theme.value=themeNight
}

const isHomePage = ref(false)
</script>
 
<template>
  <div class="bg-[#2A2B2D]" :class="theme.bgbase">
    <div>
      <Navbar @changeTheme="updateTheme($event)"  @goProfile="isHomePage = !isHomePage" :theme="theme" />
    </div>
    <div>
      <BookList :theme="theme" v-if="isHomePage" />
      <Profile :theme="theme" v-if="!isHomePage" />
    </div>
  </div>
</template>
 
<style scoped></style>