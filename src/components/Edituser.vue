<script setup>
import { ref, inject, onMounted } from 'vue'
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser, clearUser } from '../composables/accountManagement'

const emits = defineEmits([ 'updateuser','deleteuser'])
const theme = inject('theme')
const user = inject('user')
const props = defineProps(['post'])
const uid = ref('Pizcom')
const name = ref(user.value.name)
const username = ref(user.value.username)
const email = ref(user.value.email)
const phone = ref(user.value.phone)
const type = ref(user.value.type)
const password = ref(user.value.password)
const confpassword = ref(user.value.password)
const imgurl = ref(user.value.image)

const update =async () => {
    if (password.value !== confpassword.value) {
        // createNotification("warning", "Password not match!!", 2500)
        return 'passnotmatch'
    } 
    else if(password.value === confpassword.value) {
        return await updateUser({ username: username.value, name: name.value, email: email.value, phone: phone.value, type: type.value, password: password.value, image: imgurl.value })
    }

}
// const deleteuser = () => {
//     createNotification("warning", "Delete Success from Edit", 2500)
//     deleteUser(user.value.id)
// }
// Notification -----------------------------------------------------------------------------------
const notifications = ref([])
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
</script>
 
<template>
    <div class="fixed w-96 right-5 left-auto z-0 mt-24">
        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 mb-2 pr-2">{{ notification.message }}</div>
        </div>
    </div>
    <div>
        <div class="w-full mx-auto">
            <div class="flex justify-between">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader"> แก้ไขข้อมูลผู้ใช้ </h1>
                <button class="px-3 mt-10 mr-5 py-3 h-fit rounded-lg text-lg cursor-pointer hover:drop-shadow-xl"
                    @click="$emit('deleteuser', deleteUser(user.id))" :class="theme.primarybutton">DELETE ACCOUNT
                </button>
            </div>

            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
                <input placeholder="{{username}}" type="text" v-model="username" class="w-full rounded-lg pl-5" disabled
                    :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Name</div>
                <input type="text" v-model="name" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">E-mail</div>
                <input type="email" v-model="email" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Phone</div>
                <input type="text" v-model="phone" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Image Profile URL</div>
                <input type="url" v-model="imgurl" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Password</div>
                <input type="password" v-model="password" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Confirm Password</div>
                <input type="password" v-model="confpassword" class="w-full rounded-lg pl-5" :class="theme.input">
            </div>
            <div class="flex mt-8 w-full justify-end cursor-pointer">


                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
                    @click="$emit('updateuser', update())" :class="theme.primarybutton">SAVE</button>
            </div>
        </div>

    </div>
</template>
 
<style scoped></style>