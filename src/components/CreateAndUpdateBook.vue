<script setup>
import { ref, onMounted, inject, onUpdated } from 'vue';
const theme = inject('theme')
const props = defineProps(['book', 'isUpdate'])
const books = ref([])
const emits = defineEmits(['createBook'])

// create and update
const isbn = ref('')
const title = ref('')
const author = ref('')
const description = ref('')
const publisher = ref('')
const maincatagory = ref('')
const subcatagory = ref('')
const booklink = ref('')
const imgurl = ref('')

const newBook = ref({
    id: isbn.value,
    title: title.value,
    author: author.value,
    publisher: publisher.value,
    maincatagory: maincatagory.value,
    subcatagory: subcatagory.value,
    description: description.value,
    booklink: booklink.value,
    img: imgurl.value,
})


const updateBook = () => {
    if (props.book !== undefined){
        isbn.value = props.book.id
        title.value = props.book.title
        author.value = props.book.author
        publisher.value = props.book.publisher
        maincatagory.value = props.book.maincatagory
        subcatagory.value = props.book.subcatagory
        description.value = props.book.description
        booklink.value = props.book.booklink
        imgurl.value = props.book.img
    }
}


// notice
const notifications = ref([])

onMounted(() => {
    books.value = props.books
    updateBook()
})

onUpdated(() => {
    newBook.value = {
        id: isbn.value,
        title: title.value,
        author: author.value,
        publisher: publisher.value,
        maincatagory: maincatagory.value,
        subcatagory: subcatagory.value,
        description: description.value,
        booklink: booklink.value,
        img: imgurl.value,
    }
})

</script>
<template>
    <div class="fixed w-96 right-5 left-auto z-0">
        <div class="flex-col h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
        </div>
    </div>

    <div class="flex flex-col m-5 z-10">
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">ISBN</div>
            <input type="text" placeholder="กรุณากรอกรหัสหนังสือ 11 หรือ 13 หลัก" v-model="isbn" :disabled="props.isUpdate === true"
                class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Title</div>
            <input type="text" placeholder="กรุณากรอกชื่อหนังสือ" v-model="title" class="w-full rounded-lg pl-5"
                :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Author</div>
            <input type="text" placeholder="กรุณากรอกชื่อผู้แต่งหลักเพียงคนเดียว" v-model="author"
                class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Publisher</div>
            <input type="text" placeholder="กรุณากรอกชื่อสำนักพิมพ์" v-model="publisher" class="w-full rounded-lg pl-5"
                :class="theme.input">
        </div>
        <div class="flex mt-12 h-12">
            <div class="text-xl font-bold px-5 pt-2 w-48 flex items-center" :class="theme.text">Main Catagory</div>
            <select name="maincatagory" id="maincatagory" class="w-full rounded-lg pl-5" :class="theme.input"
                v-model="maincatagory">
                <option value="" disabled selected>กรุณาเลือกหมวดหนังสือ</option>
                <option value="romance">Romance / รักโรแมนติก</option>
                <option value="dramatic">Dramatic / ดราม่า</option>
                <option value="boylove">Boy Love / ชายรักชาย</option>
                <option value="girllove">Girl Love / หญิงรักหญิง</option>
                <option value="horror">Horror / สยองขวัญ</option>
                <option value="comedy">Comedy / คอมเมดี้</option>
                <option value="documentary">Documentary / สารคดี</option>
            </select>
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Sub Catagory</div>
            <input type="text" placeholder="กรุณากรอกหมวดหมู่ย่อย" v-model="subcatagory" class="w-full rounded-lg pl-5"
                :class="theme.input">
        </div>
        <div class="flex mt-12 h-min">
            <div class="text-xl font-bold px-5 pt-2  w-48" :class="theme.text">Description</div>
            <textarea type="text" placeholder="กรุณากรอกคำนำ" class="w-full rounded-lg pl-5 pt-2 h-48" v-model="description"
                :class="theme.input"></textarea>
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Book Link</div>
            <input type="text" v-model="booklink" placeholder="กรุณาใส่ลิ้งค์ของหนังสือ" class="w-full rounded-lg pl-5"
                :class="theme.input">
        </div>
        <div class="flex my-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Image URL</div>
            <input type="url" class="w-full rounded-lg pl-5" placeholder="กรุณาใส่ลิ้งค์ของรูป" v-model="imgurl"
                :class="theme.input">
        </div>
        <hr class="opacity-30">
        <div class="flex mt-8 justify-end cursor-pointer">
        <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
            :class="theme.primarybutton" @click="$emit('createBook',newBook)" >SAVE</button>
    </div>
</div></template>
<style></style>