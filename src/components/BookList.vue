
<script setup>
import { computed, inject } from 'vue'
import Catagories from './Catagories.vue';
import PostList from './PostList.vue';
const addBorrowBook = ($event) => {
    console.log($event)
}
const props = defineProps(['books'])
const theme = inject('theme')

// booksList Prop -----

</script>
 
<template>
    <div class="flex justify-center w-full pt-24 test">
        <div class="w-[70%]  test ">
            <PostList />

            <h1 class="flex justify-center font-bold text-4xl" :class="theme.textheader"> หนังสือทั้งหมด </h1>
            <div class="grid grid-flow-row">

                <!-- Romance -->
                <Catagories title="Romance / รักโรแมนติก" catagory="romance" @borrow="addBorrowBook($event)" :books="books"  />

                <!-- Drama -->
                <Catagories title="Dramatic / ดราม่า" catagory="dramatic" @borrow="addBorrowBook($event)" :books="books"/>

                <!-- Boy Love -->
                <Catagories title="Boy Love / ชายรักชาย" catagory="boylove" @borrow="addBorrowBook($event)" :books="books"/>

                <!-- Girl Love-->
                <Catagories title="Girl Love / หญิงรักหญิง" catagory="girllove" @borrow="addBorrowBook($event)" :books="books"/>

                <!-- Fantasy -->
                <Catagories title="Horror / สยองขวัญ" catagory="horror" @borrow="addBorrowBook($event)" :books="books"/>

                <!-- Comedy -->
                <Catagories title="Comedy / คอมเมดี้" catagory="comedy" @borrow="addBorrowBook($event)" :books="books"/>

                <!-- Documentary -->
                <Catagories title="Documentary / สารคดี" catagory="documentary" @borrow="addBorrowBook($event)" :books="books"/>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>