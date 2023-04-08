<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { getBookById } from '../composables/booksFetch'
const theme = inject(['theme'])
const route = useRoute()
const id = route.params.id
const book = ref({})
onMounted(async () => {
    book.value = await getBookById(id)
}) 
</script>
<template>
    <div class="w-screen h-screen overflow-x-hidden">
        <div class="absolute w-screen h-[30rem] overflow-hidden object-center opacity-20">
            <img :src="(book?.img?.length > 10) ? book?.img : '../default/coverpost.png'"
                class="w-full h-fit object-center  bg-transparen z-0 blur-sm" alt="">
        </div>
        <div class="flex relative w-screen h-screen justify-center z-0" v-if="book?.title==undefined">
            <div class="pt-24 mt-24 md:mt-40 mx-3 w-full md:w-9/12 text-xl font-bold text-center rounded-t-3xl" :class="theme.bgbase, theme.text">
                Content not available on this page. Please check the URL or try to logging in first<br><br> <a href="mailto:project203@kasidate.me" class="underline">Contact support</a> if you need further assistance
                </div>
        </div>
        <div class="flex relative  justify-center z-0"  v-if="book?.title!==undefined">
            <div class=" mt-24 md:mt-40 mx-3 w-full md:w-3/5 rounded-t-3xl grid 2xl:grid-cols-2  grid-rows-1 container "
                :class="theme.bgbase">
                <div class=" z-0 2xl:grid self-center justify-self-center hidden " v-if="(book.img?.length > 10)">
                    <img :src="book.img" class=" overflow-hidden h-min-[43rem] p-10 rounded-[4rem] z-0" alt="">
                </div>
                <div class="w-full grid grid-flow-rows mt-4 ">
                    <div class="2xl:text-3xl text-2xl self-center font-extrabold justify-self-center row-span-2 "
                        :class="theme.textheader">{{
                            book.title }}
                    </div>
                    <div class="2xl:hidden z-0 grid  self-center justify-self-center container w-full" v-if="(book.img?.length > 10)">
                        <img :src="book.img" class="w-fit mx-auto justify-center flex items-center p-10 rounded-[4rem] z-0 max-h-[30rem]" alt="">
                    </div>
                    <div :class="theme.textheader"
                        class="self-center justify-self-center 2xl:text-lg font-semibold tracking-widest flex gap-8 ">
                        <div class="w-fit h-fit border-rose border-2 border-dashed p-4 rounded-md bg-teal-600 flex">
                            ISBN : {{ book.id }}
                        </div>
                        <div
                            class="w-fit h-fit border-rose border-2 border-dashed p-4 rounded-md bg-fuchsia-500 2xl:flex uppercase">
                            {{ book.maincatagory }}
                        </div>
                    </div>
                    <div class="overflow-hidden 2xl:text-md  grid pl-4 pt-4">
                        <span :class="theme.text" class="mr-3 self-center ">Sub Catagory : </span>
                        <div class="flex">
                            <div v-for="catagory in book.subcatagory"
                                class="px-2 h-fit self-center py-1 rounded-md mx-1 whitespace-nowrap" :class="theme.lable">
                                {{ catagory }}
                            </div>
                        </div>
                    </div>
                    <div :class="theme.textheader" class="self-center 2xl:text-md pl-4  pt-4 2xl:pt-0">
                        Author: {{ book.author }}
                    </div>
                    <div :class="theme.textheader" class="self-center 2xl:text-md pl-4  pt-4 2xl:pt-0">
                        Publisher: {{ book.publisher }}
                    </div>
                    <div :class="theme.textheader" class="row-span-4">
                        <div class="2xl:text-2xl pt-4 pb-4 flex justify-center">เรื่องย่อ</div>
                        <div class="2xl:text:md indent-10 break-words px-4 leading-7 text-sm pb-10 2xl:pb-0"> {{ book.description }}</div>
                    </div>
                </div>
                <a class="px-5 py-3 w-full text-center font-normal text-white bg-[#3b5998]"
                    :href="`http://www.facebook.com/share.php?u=${shareLocation}`">
                    Share to Facebook
                </a>
                <a class="px-5 py-3 w-full text-center font-normal text-white bg-[#00acee]"
                    :href="`https://twitter.com/intent/tweet?text=${shareLocation}`">
                    Share to Twitter
                </a>
            </div>
        </div>
    </div>
</template>