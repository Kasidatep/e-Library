<script setup>
import { getBorrowBook , updateBorrowBook} from '../composables/borrowBook.js'
import { ref, onMounted, inject} from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['borrows','allBorrows'])
const theme = inject('theme')
const {user} = inject('user')
const emit= defineEmits(['updateBorrowBook','gotoRead'])
// const borrows = ref(props.borrows)
// onMounted(async () => {
//     borrows.value = await getBorrowBook(user.value.id)
//     // console.log(borrows.value)
// })

const getDateFormat = (d) => {
    const date = new Date(d)
    return date.getDay() + '/ ' + date.getUTCMonth() + '/ ' + date.getFullYear()
}


</script>
 
<template>
  
  <div class="pl-5 w-full pt-16">
    <h1 class=" font-bold lg:text-4xl text-3xl pt-10 mb-5" :class="theme.textheader">รายการการยืมของ {{ user.name }} </h1>
        <div class="w-full pr-5 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-1">
                    <div class="lg:text-2xl text-xl justify-self-center self-center px-4"></div>
                    <div class="col-span-5 lg:text-2xl text-xl pl-4 self-center font-semibold">ชื่อ</div>
                    <div class="col-span-4 lg:text-2xl text-xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1" > 
                               กำหนดการยืม
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-5 grid grid-flow-row " v-for="brBook in borrows?.filter(book => book.status==1)">
            <div class="h-fit rounded-[20px] mb-4 " :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 lg:text-xl text-lg pl-8 self-center overflow-hidden ">{{brBook.book?.title??`หนังสือ ${brBook?.bookId} ถูกนำออกจากระบบแล้ว`}}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 font-semibold" :class="theme.lable"> 
                                {{ getDateFormat(brBook.duedate) }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 lg:text-lg text-md justify-self-center self-center px-2 py-2 rounded-md font-semibold cursor-pointer"
                        :class="theme.button" @click="$emit('updateBorrowBook',brBook.id)" > คืนหนังสือ </div>

                        <a :href="brBook.book?.bookLink" class="col-span-1 lg:text-lg text-md justify-self-center self-center px-2 py-2 rounded-md font-semibold cursor-pointer" 
                        :class="theme.button" @click="$emit('gotoRead',brBook.id)" >อ่านหนังสือ</a>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>