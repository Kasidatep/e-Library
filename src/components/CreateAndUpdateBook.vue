<script setup>
import { ref, onMounted, inject, onUpdated } from 'vue';
const theme = inject('theme')
const props = defineProps(['book', 'isUpdate'])
const books = ref([])
const emits = defineEmits(['createBook'])

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

onMounted(() => {
    books.value = props.books
    updateBook()
    isb.value.focus()
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

const isb = ref(null)
const ti = ref(null)
const auth = ref(null)
const pub = ref(null)
const mc = ref(null)
const sc = ref(null)
const desc = ref(null)
const bl = ref(null)
const img = ref(null)


</script>
<template>
    

    <div class="flex flex-col m-5 z-10">
        <h1 class=" font-bold lg:text-4xl text-3xl pt-16" :class="theme.textheader"> {{ isUpdate?'แก้ไขข้อมูลหนังสือ':'เพิ่มหนังสือใหม่' }} </h1>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">ISBN*</div>
            <input type="text" pattern="[0-9]" ref="isb" placeholder="กรุณากรอกรหัสหนังสือ 11 หรือ 13 หลัก" v-model="isbn" :disabled="props.isUpdate === true" maxlength="13"
                class="w-full rounded-lg pl-5 h-12" :class="theme.input" @keyup.enter="ti.focus()">
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Title*</div>
            <input type="text" ref="ti" placeholder="กรุณากรอกชื่อหนังสือ" v-model="title" class="w-full rounded-lg pl-5 h-12"
                :class="theme.input" @keyup.enter="auth.focus()">
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Author*</div>
            <input type="text" ref="auth" placeholder="กรุณากรอกชื่อผู้แต่งหลักเพียงคนเดียว" v-model="author"
                class="w-full rounded-lg pl-5 h-12" :class="theme.input" @keyup.enter="pub.focus()">
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Publisher*</div>
            <input type="text" ref="pub" placeholder="กรุณากรอกชื่อสำนักพิมพ์" v-model="publisher" class="w-full rounded-lg pl-5 h-12"
                :class="theme.input" @keyup.enter="mc.focus()">
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1 flex items-center" :class="theme.text" >Main Catagory*</div>
            <select name="maincatagory" ref="mc" id="maincatagory" class="w-full rounded-lg pl-5 h-12" :class="theme.input" 
                v-model="maincatagory" @keyup.tab="sc.focus()">
                <option value="" disabled selected>กรุณาเลือกหมวดหนังสือ</option>
                <option value="romance" @keyup.enter="sc.focus()">Romance / รักโรแมนติก</option>
                <option value="dramatic" @keyup.enter="sc.focus()">Dramatic / ดราม่า</option>
                <option value="boylove" @keyup.enter="sc.focus()">Boy Love / ชายรักชาย</option>
                <option value="girllove" @keyup.enter="sc.focus()">Girl Love / หญิงรักหญิง</option>
                <option value="horror" @keyup.enter="sc.focus()">Horror / สยองขวัญ</option>
                <option value="comedy" @keyup.enter="sc.focus()">Comedy / คอมเมดี้</option>
                <option value="documentary" @keyup.enter="sc.focus()">Documentary / สารคดี</option>
            </select>
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Sub Catagory*</div>
            <input type="text" ref="sc" placeholder="กรุณากรอกหมวดหมู่ย่อย ใช้เครื่องหมายจุลภาค [,] เพื่อแยกประเภท" v-model="subcatagory" class="w-full rounded-lg pl-5 h-12"
                :class="theme.input" @keyup.enter="desc.focus()">
        </div>
        <div class="lg:flex mt-5  h-min">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Description</div>
            <textarea type="text" ref="desc" placeholder="กรุณากรอกคำนำ" class="w-full rounded-lg pl-5 pt-2 h-48" v-model="description"
                :class="theme.input" @keyup.enter="bl.focus()"></textarea>
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1" :class="theme.text">Book Link*</div>
            <input type="text" ref="bl" v-model="booklink" placeholder="กรุณาใส่ลิ้งค์ของหนังสือ" class="w-full rounded-lg pl-5 h-12"
                :class="theme.input" @keyup.enter="img.focus()">
        </div>
        <div class="lg:flex mt-5 h-24 lg:h-12">
            <div class="text-xl font-bold px-2 pt-2 w-48 pb-1 " :class="theme.text">Image URL*</div>
            <input type="url" ref="img" class="w-full rounded-lg pl-5 h-12" placeholder="กรุณาใส่ลิ้งค์ของรูป" v-model="imgurl"
                :class="theme.input" @keyup.enter="$emit('createBook', newBook)" @keyup.tab="isb.focus()">
        </div>
        <div class="flex mt-8 justify-end cursor-pointer">
        <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
            :class="theme.primarybutton" @click="$emit('createBook',newBook)" >SAVE</button>
    </div>
</div></template>
<style></style>