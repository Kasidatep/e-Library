<script setup>
import {computed} from 'vue'
import Catagories from './Catagories.vue';
import PostList from './PostList.vue';
const addBorrowBook = ($event)=>{
    console.log($event)
}
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
</script>
 
<template>
    <div class="flex justify-center w-full pt-24 test">
        <div class="w-[70%]  test ">
            <PostList :theme="themes" />
            
            <h1 class="flex justify-center font-bold text-4xl"  :class="themes.textheader"> หนังสือทั้งหมด </h1>
            <div class="grid grid-flow-row">
                <!-- Romance -->
                <Catagories title="Romance / รักโรแมนติก" catagory="romance" :theme="themes" @borrow="addBorrowBook($event)" />
                <!-- Drama -->
                <Catagories title="Dramatic / ดราม่า" catagory="dramatic" :theme="themes"  @borrow="addBorrowBook($event)" />
                <!-- Boy Love -->
                <Catagories title="Boy Love / ชายรักชาย" catagory="boylove" :theme="themes"  @borrow="addBorrowBook($event)" />
                <!-- Girl Love-->
                <Catagories title="Girl Love / หญิงรักหญิง" catagory="girllove" :theme="themes"  @borrow="addBorrowBook($event)" />
                <!-- Fantasy -->
                <Catagories title="Horror / สยองขวัญ" catagory="horror" :theme="themes"  @borrow="addBorrowBook($event)" />
                <!-- Comedy -->
                <Catagories title="Comedy / คอมเมดี้" catagory="comedy" :theme="themes"  @borrow="addBorrowBook($event)" />
                <!-- Documentary -->
                <Catagories title="Documentary / สารคดี" catagory="documentary" :theme="themes"  @borrow="addBorrowBook($event)" />
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>