<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser } from '../composables/accountManagement'
const emits = defineEmits(['login', 'register'])
const theme = inject('theme')
const props = defineProps(['post'])
const uid =ref('Pizcom')
const name = ref('pizza')
const username = ref('pizza')
const email = ref('pizza@mail.com')
const phone = ref('1112')
const type = ref('user')
const password = ref('1112')
const confpassword = ref('1112')
const imgurl = ref('piz') 
</script>
 
<template>
<div>
    <div class="w-full mx-auto">
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Image Profile URL</div>
            <input type="url" v-model="imgurl" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
            <input type="text" v-model="username" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Name</div>
            <input type="text" v-model="name" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">E-mail</div>
            <input type="email" v-model="email" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Phone</div>
            <input type="text" v-model="phone" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Password</div>
            <input type="password" v-model="password" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Confirm Password</div>
            <input type="password" v-model="confpassword" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-8 w-1/2 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20 mr-10" @click="$emit('login',checkUser(username,password))"
                :class="theme.primarybutton">Log In</button> 
                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="createUser({ name: name, username: username, email: email, phone: phone, type: type, password: password, confpassword: confpassword, image: imgurl })"
                :class="theme.primarybutton">Register</button>
        </div>
    </div>
</div>
</template>
 
<style scoped>

</style>