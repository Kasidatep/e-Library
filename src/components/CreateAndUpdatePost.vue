<script setup>
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts';
import { computed, ref } from 'vue';
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
const posts = ref([])
const vs = ref(1)
const imgUrl = ref(null)
const title = ref(null)
const description = ref(null)
const customUrl = ref(null)
const isPublic = ref(true)
const isAdvance = ref(false)
const showNotification = ref(true)
const notifications = ref([])
const user = ref({ id: "kasidatep" })
const createPostObj = () => {
    console.log("Creating/update post...")
    if (imgUrl.value == null) createNotification("warning","Please provide image url.",2500)
    if (title.value == null) createNotification("warning","Please provide title.",2500)
    if (description.value == null)  createNotification("warning","Please provide description.",2500)
    else {
        const data = {
                img: imgUrl.value,
                title: title.value,
                description: description.value,
                id: customUrl.value == null ? null : customUrl.value,
                visible: isPublic.value ? 1 : 2,
                userId: user.value.id,
            }
        const status = createPost(data)
        if(status==200) createNotification("success","Create Post successfully.",10000)
        if(status==200) posts.value.push(data)
    }
}
const createNotification = (type,message,timeout)=>{
    let theme = ["bg-black", "text-white"] 
    if(type=="warning") theme = ["bg-yellow-500", "text-black"]
    if(type=="success") theme = ["bg-green-500", "text-black"]
    if(type=="danger") theme = ["bg-red-500", "text-white"]
    notifications.value.push({ type: type, message: message, theme: theme })
    setTimeout(removeNoti, timeout)
}
const removeNoti = () => {
    notifications.value.shift()
}

const updatePost = (id) => {
    console.log("Updating post..."+id)
    const post = posts.value.find(e => e.id == id)
    if(post==undefined) createNotification("warning","Something wrong, cannot find post id: "+id,5000)
    else {
        customUrl.value = post.id
        title.value = post.title
        description.value = post.description
        isPublic.value = post.visible==1
        imgUrl.value = post.img
    }
}

const deletePost = async (id) => {
    console.log("Delete post..."+id)
    const status = await deletePostById(id)
    console.log("Status: " + status)
    if(status==200)  createNotification("success","Delete Post successfully.",100000)
    if(status==200) posts.value = posts.value.filter(i => i.id!==id)
}

if(posts.value.length>0) posts.value = getPosts()
</script>
<template>
   
    <div v-if="showNotification" class="fixed w-96 right-5 left-auto z-0">
        <div class="flex-col h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
        </div>
    </div>

    <div class="flex flex-col m-5 z-10"> 
        
        <div v-for="post in posts" class="text-white flex">
        <div> {{ post.title }}</div>
        <div class="px-5 text-yellow-500 cursor-pointer" @click="updatePost(post.id)"> edit </div>
        <div class=" text-red-500 cursor-pointer" @click="deletePost(post.id)"> delete </div>
        </div>


        <div class="flex mt-12 h-12 ">
            <div class="text-2xl font-bold px-5 pt-2 w-48" :class="theme.text">Title</div>
            <input type="text" v-model="title" class="w-full rounded-lg pl-5" :class="themes.input">
        </div>
        <div class="flex mt-12 h-min">
            <div class="text-2xl font-bold px-5 pt-2  w-48" :class="theme.text">Description</div>
            <textarea type="text" class="w-full rounded-lg pl-5 pt-2 h-48" v-model="description"
                :class="themes.input"></textarea>
        </div>
        <div class="flex my-12 h-12 ">
            <div class="text-2xl font-bold px-5 pt-2 w-48" :class="theme.text">Image URL</div>
            <input type="url" class="w-full rounded-lg pl-5" v-model="imgUrl" :class="themes.input">
        </div>
        <hr class="opacity-30">
        <div v-if="isAdvance">
            <div class="flex mt-12 h-12 ">
                <div class="text-2xl font-bold px-5 pt-2 w-72" :class="theme.text">Custom URL post</div>
                <input type="text" class="w-full rounded-lg pl-5" v-model="customUrl" :class="themes.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-2xl font-bold px-5 pt-2 w-72" :class="theme.text">Visible Status</div>
                <label for="vs_public" class="text-2xl mr-5 pt-2 px-3 rounded-lg w-fit"
                    :style="isPublic ? 'border-color: yellow; border-width: 2px;' : ''" @click="isPublic = true"
                    :class="themes.input">ALL USER</label>
                <label for="vs_private" class="text-2xl pt-2 px-3 rounded-lg"
                    :style="isPublic ? '' : 'border-color: yellow; border-width: 2px;'" @click="isPublic = false"
                    :class="themes.input">ONLY SIGN IN USER</label>
                <input type="radio" id="vs_public" value="1" class="hidden" v-model="vs" :class="themes.input">
                <input type="radio" id="vs_private" value="2" class="hidden" v-model="vs" :class="themes.input">
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-fit text-center mt-8 px-16 border-2 p-2 rounded-full font-bold cursor-pointer"
                :class="themes.primarybutton" @click="isAdvance = !isAdvance">{{ isAdvance ? 'Hide' : 'Show' }} Advance
                Option</div>
        </div>
        <div class="flex mt-8 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="createPostObj"
                :class="themes.primarybutton">SAVE</button>
        </div>
    </div>
</template>
<style></style>