<script setup>
import { ref, onMounted, inject} from 'vue'
import {useRoute} from 'vue-router'
import {getBookById} from '../composables/booksFetch'
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
            <img :src="(book.img?.length > 10) ? book.img : '../default/coverpost.png'"
                class="w-full h-fit object-center  bg-transparen z-0 blur-sm" alt="">
        </div>
            <div class="flex relative w-screen h-screen justify-center z-0">
                <div class=" mt-24 md:mt-40 mx-3 w-full md:w-3/5 rounded-t-3xl grid grid-cols-2  grid-rows-1"
                    :class="theme.bgbase">
                    <div class=" z-0 grid self-center justify-self-center" v-if="(book.img?.length > 10)">
                        <img :src="book.img" class="w-[400px] overflow-hidden  rounded-3xl z-0" alt="">
                    </div>
                    <div class="w-full grid grid-flow-rows ">
                        <div class="text-3xl self-center font-extrabold justify-self-center row-span-2" :class="theme.textheader">{{
                            book.title }}
                        </div>
                        <div :class="theme.textheader"
                            class="self-center justify-self-center text-xl font-semibold tracking-widest flex gap-8">
                            <div class="w-fit h-fit border-rose border-2 border-dashed p-4 rounded-md bg-teal-600 flex">
                                ISBN : {{ book.id }}
                            </div>
                            <div
                                class="w-fit h-fit border-rose border-2 border-dashed p-4 rounded-md bg-fuchsia-500 flex uppercase">
                                {{ book.maincatagory }}
                            </div>
                        </div>
                        <div class="overflow-hidden text-lg grid">
                            <span :class="theme.text" class="mr-3 self-center ">Sub Catagory : </span>
                            <div class="flex">
                                <div v-for="catagory in book.subcatagory"
                                    class="px-2 h-fit self-center py-1 rounded-md mx-1 whitespace-nowrap" :class="theme.lable">
                                    {{ catagory }}
                                </div>
                            </div>
                        </div>
                        <div :class="theme.textheader" class="self-center text-lg">
                            Author: {{ book.author }}
                        </div>
                        <div :class="theme.textheader" class="self-center text-lg">
                            Publisher: {{ book.publisher }}
                        </div>
                        <div :class="theme.textheader" class="row-span-4">
                            <div class="text-2xl pt-4 pb-4 flex justify-center">เรื่องย่อ</div>
                            <div class="indent-10 break-words px-4 leading-7"> {{ book.description }}</div>
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