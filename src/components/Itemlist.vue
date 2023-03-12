<script setup>
import { computed } from 'vue'
import RiDeleteBin5Fill from './icons/RiDeleteBin5Fill.vue'
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
</script>
 
<template>
    <div class="w-full">
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="themes.profilebutton">
                <div :class="themes.text" class="grid grid-cols-11 py-6">
                    <div class="text-2xl justify-self-center self-center px-4">ชื่อ</div>
                    <div class="col-span-5 text-2xl justify-self-center self-center">dsaaaaaaaaa</div>
                    <div class="text-2xl justify-self-center self-center">หมวดหมู่</div>
                    <div class="col-span-2 text-xl justify-self-center self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="themes.lable"> Girl
                                Love
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-xl justify-self-center self-center px-3 py-[0.5em] rounded-md font-semibold"
                        :class="themes.button">ยืมหนังสือ</div>
                    <div class="col-span-1 text-2xl justify-self-center self-center bg-red-500 p-3 rounded-md">
                        <RiDeleteBin5Fill />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="themes.profilebutton">
                <div :class="themes.text" class="grid grid-cols-11 py-6">
                    <div class="text-2xl justify-self-center self-center px-4">ชื่อ</div>
                    <div class="col-span-5 text-2xl justify-self-center self-center">dsaaaaaaaaa</div>
                    <div class="text-2xl justify-self-center self-center">หมวดหมู่</div>
                    <div class="col-span-2 text-xl justify-self-center self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="themes.lable"> Girl
                                Love
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-xl justify-self-center self-center px-3 py-[0.5em] rounded-md font-semibold"
                        :class="themes.button">ยืมหนังสือ</div>
                    <div class="col-span-1 text-2xl justify-self-center self-center bg-red-500 p-3 rounded-md">
                        <RiDeleteBin5Fill />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="themes.profilebutton">
                <div :class="themes.text" class="grid grid-cols-11 py-6">
                    <div class="text-2xl justify-self-center self-center px-4">ชื่อ</div>
                    <div class="col-span-5 text-2xl justify-self-center self-center">dsaaaaaaaaa</div>
                    <div class="text-2xl justify-self-center self-center">หมวดหมู่</div>
                    <div class="col-span-2 text-xl justify-self-center self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="themes.lable"> Girl
                                Love
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-xl justify-self-center self-center px-3 py-[0.5em] rounded-md font-semibold"
                        :class="themes.button">ยืมหนังสือ</div>
                    <div class="col-span-1 text-2xl justify-self-center self-center bg-red-500 p-3 rounded-md">
                        <RiDeleteBin5Fill />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>