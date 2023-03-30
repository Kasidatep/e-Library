<script setup>
import { inject } from 'vue'
import Delete from './icons/RiDeleteBin5Fill.vue'
const theme = inject('theme')
const props = defineProps(['items','config'])
const emits = defineEmits(['event1','event2'])
</script>
 
<template>
    
    <div class="pl-5 w-full pt-16">
        <h1 class=" font-bold text-4xl pt-10 mb-5" :class="theme.textheader">{{ config.header }} </h1>
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.itemlist">
                <div :class="theme.text" class="md:grid grid-cols-12 py-1 hidden">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-6 text-xl pl-4 self-center">ชื่อ</div>
                    <div class="col-span-3 text-xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="w-fit py-[0.5em] rounded-md mx-1 font-semibold" > 
                               {{config.subname}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row" v-for="item in items">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-12 md:col-span-7 text-xl pl-8 self-center overflow-hidden ">{{item.title}}</div>
                    <div class="col-span-7 md:col-span-2 text-md pl-4 self-center">
                        <div class="flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 text-md font-semibold" :class="theme.lable"> 
                                {{ item?.[config.subvalue] }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-5 md:col-span-3 grid-flow-row flex justify-end mr-3">
                    <div class="col-span-1 mx-1 text-md justify-self-center self-center px-2 py-[0.5em] rounded-md font-semibold"  :class="theme.button" @click="$emit('event1',item.id)">{{config.action1}}</div> 
                    <div class="col-span-1 mx-1 text-md justify-self-center self-center px-2 py-[0.5em] rounded-md font-semibold" :class="theme.button" @click="$emit('event2',item.id)"> {{config.action2}}
                     
                    </div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>