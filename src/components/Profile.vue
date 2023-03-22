<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import Catagories from './Catagories.vue';
import Itemlist from './Itemlist.vue'
import CreateAndUpdatePost from './CreateAndUpdatePost.vue';
import PostList from './PostList.vue';
import LogIn from './LogIn.vue';
import CreateAndUpdateBook from './CreateAndUpdateBook.vue';
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts'


const theme = inject('theme')
const user = ref({ id: "kasidatep" ,name: "kasidatep.", type: 'a', image: 'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg' })
const isUser = computed(() => user.value.type == 'user')
const props = defineProps(['books'])
const posts = ref([])

const editpost = async (data, isUpdate) => {
    console.log(data)
    console.log(isUpdate)
    let status
    posts.value = await getPosts()
    const isUpdatedObj = posts.value?.find(p => p.id == data?.id)
    console.log(isUpdatedObj)
    if (isUpdatedObj !== undefined && data.id !== null) {
        data.postDate = isUpdatedObj.postDate
        data.userId = isUpdatedObj.userId
        status = await updatePostById(isUpdatedObj.id, data)
        if (status == 200) {
            console.log(status)
            posts.value.splice(posts.value.findIndex(p => p.id == isUpdatedObj.id), 1, data)
            isEditPost.value = false
        }
    }
    else {
        data.userId = user.value.id
        console.log(data)
        status = await createPost(data)
        if (status == 201) {
            if (status == 201) posts.value = await getPosts()
        }
    }
}
const postEditItem = ref({})
const isEditPost = ref(false)
const editPostById = async(postId) => {
    console.log(postId)
    if(posts.value.length==0) posts.value = await getPosts()
    postEditItem.value = await posts.value.find(apost => apost.id==postId) 
    if(postEditItem.value==-undefined) return false
    console.log(postEditItem.value)
    isEditPost.value=true
}

const deletePost = async (id) => {
    console.log("Delete post..." + id)
    const status = await deletePostById(id)
    if (status == 200) posts.value = posts.value.filter(i => i.id !== id)
}

onMounted(async () => {
    posts.value = await getPosts()
})

</script>
 
<template>
    <div class="w-full h-full pt-20 test flex">
        <div class="w-[25%] h-full fixed bg-opacity-40" :class="theme.bgblock">
            <div class="flex flex-col">
                <div class="pt-16 flex justify-center">
                    <img :src="user.image" class="h-56 w-56 bg-gray-700 rounded-full">
                </div>
                <div class="text-3xl text-center mt-4 mb-4 uppercase" :class="theme.textheader">{{ user?.name ?? 'Guest' }}
                </div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser">เพิ่มหนังสือใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser">สร้างโพสต์ใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser">รายการหนังสือทั้งหมด</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser">รายการหนังสือที่ถูกยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="isUser">หนังสือที่ชอบ</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="isUser">รายการการยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="isUser">ประวัติการยืมของฉัน</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton">แก้ไขข้อมูลผู้ใช้</div>
                <div
                    class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 bg-red-600 text-white">
                    ออกจากระบบ</div>
            </div>
        </div>
        <div class="w-[75%] h-full ml-[25%]">

            <div class="pl-8 w-full" v-if="isEditPost">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">แก้ไขโพสต์ </h1>
                <CreateAndUpdatePost :post="postEditItem" @createPost="editpost($event, {isUpdate:false})" />
             </div>

            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการการยืม </h1>
                <CreateAndUpdateBook :posts="posts" />
            </div>

            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการหนังสือทั้งหมด </h1>
                <Itemlist :books="books" />
            </div>
            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการทั้งหมด </h1>
                <PostList :posts="posts"  @editPostById="editPostById" @deletePostById="deletePost"/>
            </div>
            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">สร้างโพสต์ </h1>
                <CreateAndUpdatePost :post="editpost" @createPost="editpost($event, {isUpdate:false})" />
        </div>
        <div class="pl-8 w-full" v-if="1">
            <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">Log In </h1>
            <LogIn />
        </div>
    </div>
</div></template>
 
<style scoped></style>