<script setup>
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts';
import { computed, ref, onMounted, inject } from 'vue';
const theme = inject('theme')
const props = defineProps(['posts'])
const books = ref([])
const imgUrl = ref(null)
const title = ref(null)
const description = ref(null)
const customUrl = ref(null)
const notifications = ref([])
const user = ref({ id: "kasidatep" })
const isCreateBook = ref(true)

const createBookObj = () => {
    isCreatePost.value = true
    console.log("Creating/update post...")
    if (imgUrl.value == null) createNotification("warning", "Please provide image url.", 2500)
    if (title.value == null) createNotification("warning", "Please provide title.", 2500)
    if (description.value == null) createNotification("warning", "Please provide description.", 2500)

    else {
        const data = {
            id: customUrl.value == null ? null : customUrl.value,
            title: title.value,
            description: description.value,
            img: imgUrl.value,
            visible: isPublic.value ? 1 : 2,
            userId: user.value.id
        }
        let status
        const isUpdatedObj = posts.value.find(p => p.id == customUrl.value)
        console.log(isUpdatedObj)
        if (isUpdatedObj !== undefined && customUrl.value !== null) {
            data.postDate = isUpdatedObj.postDate
            status = updatePostById(isUpdatedObj.id, data)
            if (status == 200) {
                createNotification("success", "Update Post successfully.", 10000)
                posts.value.splice(posts.value.findIndex(p => p.id == isUpdatedObj.id), 1, data)
            }
        }
        else {
            status = createPost(data)
            if (status == 201) {
                createNotification("success", "Create Post successfully.", 10000)
                if (status == 201) posts.value.push(data)
            }

        }

    }
}

const updatePost = (id) => {
    isCreatePost.value = false
    console.log("Updating post..." + id)
    const post = posts.value.find(e => e.id == id)
    if (post == undefined) createNotification("warning", "Something wrong, cannot find post id: " + id, 5000)
    else {
        customUrl.value = post.id
        title.value = post.title
        description.value = post.description
        isPublic.value = post.visible == 1
        imgUrl.value = post.img
    }
}

const deletePost = async (id) => {
    console.log("Delete post..." + id)
    const status = await deletePostById(id)
    if (status == 200) createNotification("success", "Delete Post successfully.", 3000)
    if (status == 200) posts.value = posts.value.filter(i => i.id !== id)
}

const createNotification = (type, message, timeout) => {
    let theme = ["bg-black", "text-white"]
    if (type == "warning") theme = ["bg-yellow-500", "text-black"]
    if (type == "success") theme = ["bg-green-500", "text-black"]
    if (type == "danger") theme = ["bg-red-500", "text-white"]
    notifications.value.push({ type: type, message: message, theme: theme })
    setTimeout(removeNotification, timeout)
}

const removeNotification = () => {
    notifications.value.shift()
}

onMounted(() => {
    books.value = props.books
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
            <input type="text" placeholder="กรุณากรอกรหัสหนังสือ 11 หรือ 13 หลัก" v-model="title" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Author</div>
            <input type="text" placeholder="กรุณากรอกชื่อผู้แต่งหลักเพียงคนเดียว" v-model="title" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Title</div>
            <input type="text" placeholder="กรุณากรอกชื่อหนังสือ" v-model="title" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12">
            <div class="text-xl font-bold px-5 pt-2 w-48 flex items-center" :class="theme.text">Main Catagory</div>
            <select name="maincatagory" id="maincatagory" class="w-full rounded-lg pl-5" :class="theme.input">
                <option value="romance" selected>Romance / รักโรแมนติก</option>
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
            <input type="text" v-model="title" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-min">
            <div class="text-xl font-bold px-5 pt-2  w-48" :class="theme.text">Description</div>
            <textarea type="text" class="w-full rounded-lg pl-5 pt-2 h-48" v-model="description"
                :class="theme.input"></textarea>
        </div>
        <div class="flex my-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Image URL</div>
            <input type="url" class="w-full rounded-lg pl-5" v-model="imgUrl" :class="theme.input">
        </div>
        <hr class="opacity-30">
        <div class="flex mt-8 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="createPostObj"
                :class="theme.primarybutton">SAVE</button>
        </div>
    </div>
</template>
<style></style>