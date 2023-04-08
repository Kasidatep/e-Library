<script setup>
import {inject} from 'vue'

const props=defineProps(['like','favorites'])
const {user} = inject('user')
const theme = inject('theme')
const emit =defineEmits(['delFav'])



</script>
 
<template>
<div>
    
  <div class="pl-5 w-full pt-16">
    <h1 class=" font-bold lg:text-4xl text-3xl pt-10 mb-5" :class="theme.textheader">หนังสือที่ชอบของ {{ user.name }} </h1>
        <div class="w-full pr-5 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-1">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-6 text-2xl pl-4 self-center font-semibold">ชื่อ</div>
                    <div class="col-span-3 text-2xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1" > 
                               ครบกำหนดการยืม
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row" v-for="favorite in favorites">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 text-xl pl-8 self-center overflow-hidden ">{{favorite.book?.title??`หนังสือ ${favorite?.bookId} ถูกนำออกจากระบบแล้ว`}}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 font-semibold" :class="theme.lable"> 
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold cursor-pointer"
                        :class="theme.button" @click="$emit('delFav',favorite?.id)" > เลิกชอบ </div> 

                        <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold cursor-pointer" 
                        :class="theme.button">อ่านหนังสือ</div>
                </div>
            </div>
        </div>
    </div>
</div> 
</template>
 
<style scoped>

</style>