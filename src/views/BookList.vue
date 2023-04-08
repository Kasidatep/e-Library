<script setup>
import { ref, onMounted, inject } from 'vue'
import Catagories from '../components/Catagories.vue';
import {getBooks} from '../composables/booksFetch.js'
import { addBrBook } from '../composables/borrowBook.js'
import { addFavoriteBookById } from '../composables/favoriteBook';
const {user} = inject('user')

const checkUser=()=>{
    if(user.value.id===undefined){
        createNotification("warning", "Cannot Borrow book please Log In first!! ", 2500)
    }else{
       
    }
} 


const addFavoriteBook = async ($event) => {
    if(await user.value.id===undefined){
         createNotification("warning", " please Log In first!! ", 2500)
        return false
    }else{
    let favorites=  {
    "bookId": $event,
    "userId": user.value.id,

    }
    const status = await addFavoriteBookById(favorites)
    if(status == 201){
        createNotification("success", "Congrats, "+ $event+ " Added!", 2500)
    }else if(status==400){
        createNotification("warning", "This Book are already in your Favorite List", 2500)
    }else{

    }
}  
}


const addBorrowBook = async ($event) => {
    if(await user.value.id===undefined){
         createNotification("warning", "Cannot Borrow book please Log In first!! ", 2500)
        return false
    }else{
    let brBooks=  {
    "bookId": $event,
    "userId": user.value.id,
    "borrowdate": new Date(Date.now()),
    "returndate": null,
    "duedate": new Date(Date.now()+(86400000*7)),
    "status": 1
    }
    const status = await addBrBook(brBooks)
    if(status == 201){
        createNotification("success", "Congrats, "+ $event+ " Added!", 2500)
    }else if(status == 304){
        createNotification("warning", "This book already exists in your borrows list", 2500)
    }else {
        createNotification("warning", "Cannot Add!! Something wrong ", 2500)
    }
    
    }
    
}

const props = defineProps(['books'])
const theme = inject('theme')
const books = ref([])
onMounted(async () => {
  books.value = await getBooks()
 
})

const notifications = ref([])
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
      <div class="fixed w-96 right-5 left-auto z-50 mt-24">
        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
        </div>
    </div>
    <div class="flex justify-center w-full pt-32">
        <div class="w-[70%]  ">

            <h1 class="flex justify-center font-bold text-4xl" :class="theme.textheader"> หนังสือทั้งหมด </h1>
            <div class="grid grid-flow-row">
 
 <Catagories title="Romance / รักโรแมนติก" catagory="romance" @borrow="addBorrowBook($event)" @addFav="addFavoriteBook($event)"  :books="books"  />


<Catagories title="Dramatic / ดราม่า" catagory="dramatic" @borrow="addBorrowBook($event)"  @addFav="addFavoriteBook($event)" :books="books"/>


<Catagories title="Boy Love / ชายรักชาย" catagory="boylove" @borrow="addBorrowBook($event)"  @addFav="addFavoriteBook($event)" :books="books"/>


<Catagories title="Girl Love / หญิงรักหญิง" catagory="girllove" @borrow="addBorrowBook($event)"  @addFav="addFavoriteBook($event)" :books="books"/>


<Catagories title="Horror / สยองขวัญ" catagory="horror" @borrow="addBorrowBook($event)"  @addFav="addFavoriteBook($event)" :books="books"/>


<Catagories title="Comedy / คอมเมดี้" catagory="comedy" @borrow="addBorrowBook($event)"  @addFav="addFavoriteBook($event)" :books="books"/>


<Catagories title="Documentary / สารคดี" catagory="documentary" @borrow="addBorrowBook($event)" @addFav="addFavoriteBook($event)" :books="books"/>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>