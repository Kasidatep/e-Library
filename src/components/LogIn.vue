<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser, clearUser } from '../composables/accountManagement'
const theme = inject('theme')
const user = inject('user')
const username = ref('meow')
const password = ref('cat')
const emits = defineEmits(['login', 'toRegister'])

</script>
<template>
    <div class="w-full mx-auto">
        <div class="flex flex-col md:flex-row mt-12 h-24 md:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Username</div>
            <input type="text" v-model="username" class="w-full rounded-lg h-12 pl-5" :class="theme.input">
        </div>
        <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Password</div>
            <input type="password" v-model="password" class="w-full rounded-lg h-12 pl-5" :class="theme.input">
        </div>
        
        <div class="flex mt-8 justify-end cursor-pointer">
            <div class=" py-3 mr-5 text-md cursor-pointer hover:drop-shadow-xl" :class="theme.text">
Don't have an account yet?
            <a class="font-extrabold underline decoration-2" @click="$emit('toRegister')">Register</a></div>
            <button class="px-3 py-3 rounded-lg text-lg cursor-pointer hover:drop-shadow-xl z-10 w-fit"
                @click="$emit('login', checkUser(username, password))" :class="theme.primarybutton">Log In</button>
        </div>
    </div>
</template>