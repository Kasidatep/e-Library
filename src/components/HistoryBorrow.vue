<script setup>
import { getBorrowBook } from '../composables/borrowBook.js'
import { ref, onMounted, inject} from 'vue'
import { getDateFormat } from '../composables/dateFormat'

const props = defineProps(['borrows'])
const theme = inject('theme')
const {user} = inject('user')
const emit= defineEmits(['updateBorrowBook'])
const borrows = ref(props.borrows)

onMounted(async () => {
    borrows.value = await getBorrowBook(user.value.id)
})

</script>
 
<template>
 
 <div class="pl-5 w-full pt-16">
    <h1 class=" font-bold lg:text-4xl text-3xl pt-10 mb-5" :class="theme.textheader">ประวัติการยืมของ {{ user.name }} </h1>
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-1">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-6 text-2xl pl-4 self-center font-semibold">ชื่อ</div>
                    <div class="col-span-3 text-2xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1" > 
                               วันที่ยืม
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row" v-for="brBook in borrows ">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.itemlist">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 text-xl pl-8 self-center overflow-hidden ">{{brBook.book?.title??`หนังสือ ${brBook?.bookId} ถูกนำออกจากระบบแล้ว`}}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 font-semibold" :class="theme.lable"> 
                                {{ getDateFormat(brBook.borrowdate) }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold  cursor-pointer"
                        :class="theme.button" v-if="brBook.status==2" >คืนแล้ว  </div>
                        
                        <div class="col-span-1 text-lg justify-self-center self-center px-1 py-2 rounded-md font-semibold cursor-pointer"
                        :class="theme.lable" v-if="brBook.status==1"  >ยังไม่คืน  </div>

    
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>