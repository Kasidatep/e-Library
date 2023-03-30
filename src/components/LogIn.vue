<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { checkUser } from '../composables/accountManagement'
const theme = inject('theme')
const user = inject('user')
const username = ref('')
const password = ref('')
const emits = defineEmits(['login', 'toRegister'])
const keepuser = ref(false)
</script>
<template>
    <div class="w-full mx-auto">
        <div class="flex flex-col md:flex-row mt-12 h-24 md:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Username</div>
            <input type="text" placeholder="username" v-model="username" class="w-full rounded-lg h-12 pl-5" :class="theme.input">
        </div>
        <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Password</div>
            <input type="password" placeholder="password" v-model="password" class="w-full rounded-lg h-12 pl-5" :class="theme.input">
        </div>
        <div class="flex flex-col md:flex-row mt-3 md:h-12">
            <div class="text-lg font-bold px-2 pt-2 w-48"></div>
            <div class="w-full rounded-lg h-12 mt-3 md:mt-5">
                 <input type="checkbox" id="ke-usr" v-model="keepuser" class="rounded-lg" :class="theme.input">
                 <lable for="ke-usr" class="text-md font-bold pl-5"  :class="theme.text">Keep me logged In.</lable>
            </div>
           
        </div>
        
        <div class="flex mt-8 justify-end cursor-pointer">
            <div class=" py-3 mr-5 text-md cursor-pointer hover:drop-shadow-xl" :class="theme.text">
Don't have an account yet?
            <a class="font-extrabold underline decoration-2" @click="$emit('toRegister')">Register</a></div>
            <button class="px-3 py-3 rounded-lg text-lg cursor-pointer hover:drop-shadow-xl z-10 w-fit"
                @click="$emit('login', checkUser(username, password),keepuser)" :class="theme.primarybutton">Log In</button>
        </div>
    </div>
</template>