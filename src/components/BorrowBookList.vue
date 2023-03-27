<script setup>
import { getBorrowBook , deleteBorrowBook} from '../composables/borrowBook.js'
import { ref, onMounted,inject} from 'vue'

const props = defineProps(['borrows'])
const theme = inject('theme')
const user = inject('user')
const brBooks = ref([])



onMounted(async () => {
    brBooks.value = await getBorrowBook()
    console.log(brBooks.value)
})
console.log("here a rai near")

const getDateFormat = (d) => {
    const date = new Date(d)
    return date.getDay() + '/ ' + date.getUTCMonth() + '/ ' + date.getFullYear()
}
</script>
 
<template>
    <!-- <div v-for="brBook in brBooks">
    {{ brBook.id }}{{ brBook.bookId }}  {{ brBook.userId }}
    </div> -->
     <div class="w-full pt-16">
        <div class="w-full pr-16 grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-1">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-6 text-2xl pl-4 self-center">ชื่อ</div>
                    <div class="col-span-3 text-2xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 font-semibold" > 
                               ครบกำหนดการยืม
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pr-16 grid grid-flow-row" v-for="brBook in brBooks">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-7 text-xl pl-8 self-center overflow-hidden ">{{brBook.book.title }}</div>
                    <div class="col-span-3 text-md pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1  font-semibold" :class="theme.lable"> 
                                {{ getDateFormat(brBook.duedate) }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold"
                        :class="theme.button" @click="deleteBorrowBook(brBook.id)" > คืนหนังสือ </div>

                        <div class="col-span-1 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold" 
                        :class="theme.button">อ่านหนังสือ</div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>