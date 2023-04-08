<script setup>
import { ref, inject, onMounted } from 'vue'
import { deleteUser, updateUser } from '../composables/accountManagement'

const emits = defineEmits([ 'updateuser','deleteuser'])
const theme = inject('theme')
const {user} = inject('user')
const props = defineProps(['post'])
const name = ref(user.value.name)
const username = ref(user.value.username)
const email = ref(user.value.email)
const phone = ref(user.value.phone)
const type = ref(user.value.type)
const password = ref(user.value.password)
const confpassword = ref(user.value.password)
const imgurl = ref(user.value.image)
const na = ref(null)
const usr = ref(null)
const em = ref(null)
const ph = ref(null)
const passwd = ref(null)
const cpasswd = ref(null)
const img = ref(null)
const showDialog = ref()
const update =async () => {
    if (password.value !== confpassword.value) {
        return 'passnotmatch'
    } 
    else if(password.value === confpassword.value) {
        return await updateUser({ username: username.value, name: name.value, email: email.value, phone: phone.value, type: type.value, password: password.value, image: imgurl.value })
    }

}
onMounted(() => {
    na.value.focus()
})
</script>
 
<template>
    <div class=" z-20 absolute top-5 w-full m-5 rounded-3xl" :class="theme.bgblock" v-show="showDialog">
            <div class=" p-10 h-2/4 w-full ">
                <div class="flex flex-col w-full">
                    <div class="text-lg font-bold px-2 pt-2  mb-3" :class="theme.text">Type password to confirm your
                        action!!</div>
                    <div class="flex w-full">
                        <input type="password" placeholder="Enter password..." 
                            class="w-full rounded-lg h-12 pl-5" :class="theme.input">
                        <button class="rounded-lg h-12 ml-3 px-5 w-fit cursor-pointer hover:drop-shadow-xl "
                            @click="$emit('deleteuser', deleteUser(user.id)),showDialog = false" :class="theme.primarybutton">Confirm</button>
                    </div>

                </div>
            </div>
        </div>

    <div>
        <div class="w-full mx-auto">
            <div class="flex justify-between">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader"> แก้ไขข้อมูลผู้ใช้ </h1>
                <button class="px-3 mt-10 mr-5 py-3 h-fit rounded-lg text-lg cursor-pointer hover:drop-shadow-xl" v-show="user.id!=='admin'"
                    @click="showDialog = true" :class="theme.primarybutton">DELETE ACCOUNT
                </button>
            </div>

            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
                <input placeholder="{{username}}" type="text" v-model="username" class="w-full rounded-lg pl-5" disabled
                    :class="theme.input" >
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Name</div>
                <input type="text" ref="na" v-model="name" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="em.focus()">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">E-mail</div>
                <input type="email" ref="em" v-model="email" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="ph.focus()">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Phone</div>
                <input type="text" ref="ph" v-model="phone" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="img.focus()">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Image Profile URL</div>
                <input type="url" ref="img" v-model="imgurl" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="passwd.focus()">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Password*</div>
                <input type="password" ref="passwd" v-model="password" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="cpasswd.focus()">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-lg font-bold px-5 pt-2 w-48" :class="theme.text">Confirm Password*</div>
                <input type="password" ref="cpasswd" v-model="confpassword" class="w-full rounded-lg pl-5" :class="theme.input" @keyup.enter="$emit('updateuser', update())">
            </div>
            <div class="flex mt-8 w-full justify-end cursor-pointer">


                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
                    @click="$emit('updateuser', update())" :class="theme.primarybutton">SAVE</button>
            </div>
        </div>

    </div>
</template>
 
<style scoped></style>