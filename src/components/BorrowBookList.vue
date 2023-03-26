<script setup>
import { getBorrowBook } from '../composables/borrowBook.js'
import { ref, onMounted } from 'vue'
const props = defineProps(['borrows'])
// const theme = inject('theme')

const brBooks = ref([])
onMounted(async () => {
    brBooks.value = await getBorrowBook()
    console.log(brBooks.value)
})
console.log("here a rai near")
</script>
 
<template>
    <h1>fuck u</h1>
    <div v-for="brBook in brBooks">
    {{ brBook.title }}  {{ brBook.maincatagory }}
    </div>
     <!-- <div class="w-full pt-16">
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
        <div class="w-full pr-16 grid grid-flow-row" v-for="brBook in brBooks">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 text-xl pl-8 self-center overflow-hidden ">{{brBook.title}}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="theme.lable"> 
                                {{ brBook.maincatagory.toUpperCase() }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold"
                        :class="theme.button">ยืมหนังสือ</div>
                    <div class="col-span-1 text-2xl justify-self-center self-center bg-red-500 p-3 rounded-md">
                        <RiDeleteBin5Fill />
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>
 
<style scoped>

</style>