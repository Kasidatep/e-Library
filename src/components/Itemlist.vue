<script setup>
import { inject } from 'vue'
import RiDeleteBin5Fill from './icons/RiDeleteBin5Fill.vue'
const theme = inject('theme')
const props = defineProps(['books'])
const emits = defineEmits(['updateBookById','deleteBookById'])
</script>
 
<template>
    
    <div class="w-full pt-16">
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-1">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-6 text-2xl pl-4 self-center">ชื่อ</div>
                    <div class="col-span-3 text-2xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 font-semibold" > 
                               หมวดหมู่
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row" v-for="book in books">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 text-xl pl-8 self-center overflow-hidden ">{{book.title}}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="theme.lable"> 
                                {{ book.maincatagory?.toUpperCase() }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold" @click="$emit('updateBookById',book.id)"
                        :class="theme.button" >แก้ไขข้อมูล</div>
                    <div class="col-span-1 text-2xl justify-self-center self-center bg-red-500 p-3 rounded-md">
                        <RiDeleteBin5Fill @click="$emit('deleteBookById',book.id)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>