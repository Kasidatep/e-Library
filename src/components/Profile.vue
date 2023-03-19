<script setup>
import { ref, computed } from 'vue'
import Catagories from './Catagories.vue';
import Itemlist from './Itemlist.vue'
import CreateAndUpdatePost from './CreateAndUpdatePost.vue';
import { readUser, createUser, findUser, deleteUser, setUser, checkUser } from '../composables/accountManagement'
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
const user = ref({name:"chanathip", type:'users',image:'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'})
const isUser = computed(()=> user.value.type == 'user')
   
</script>
 
<template>
    <div class="w-full h-full pt-20 test flex">
        <div class="w-[25%] h-full fixed bg-opacity-40" :class="themes.bgblock">
            <div class="flex flex-col">
                <div class="pt-16 flex justify-center">
                    <img :src="user.image" class="h-56 w-56 bg-gray-700 rounded-full">
                </div>
                <div class="text-3xl text-center mt-4 mb-4 uppercase" :class="themes.textheader">{{user?.name??'Guest'}}</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300" :class="themes.profilebutton" v-if="!isUser">เพิ่มหนังสือใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300" :class="themes.profilebutton" v-if="!isUser">สร้างโพสต์ใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 " :class="themes.profilebutton" v-if="!isUser">รายการหนังสือทั้งหมด</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 " :class="themes.profilebutton" v-if="!isUser">รายการหนังสือที่ถูกยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 " :class="themes.profilebutton" v-if="isUser">หนังสือที่ชอบ</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300" :class="themes.profilebutton"  v-if="isUser">รายการการยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300" :class="themes.profilebutton"  v-if="isUser">ประวัติการยืมของฉัน</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300" :class="themes.profilebutton">แก้ไขข้อมูลผู้ใช้</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 bg-red-600 text-white" >ออกจากระบบ</div>
            </div>
        </div>
        <div class="w-[75%] h-full ml-[25%]">
            <div class="pl-8 w-full" v-if="0">
                <h1 class=" font-bold text-4xl pt-16"  :class="themes.textheader">หนังสือที่ชอบ </h1>
                <Catagories title="หนังสือยอดนิยม" catagory="girllove" :theme="themes"
                    @borrow="addBorrowBook($event)" />
                <div class="w-full mt-12">
                    <Itemlist :theme="themes" />
                </div>
            </div>
            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16"  :class="themes.textheader">สร้าง และแก้ไขโพสต์ </h1>
                <CreateAndUpdatePost :theme="themes"/>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>