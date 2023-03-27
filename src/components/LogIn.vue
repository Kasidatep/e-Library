<script setup>
import { ref, computed, onMounted, inject  } from 'vue'
import { readUser, createUser, findUser, deleteUser, setUser, checkUser } from '../composables/accountManagement'
const theme =  inject('theme')
const users = ref([])
const username = ref('permm')
const password = ref('1234')
const login = ref('')

onMounted(async () => {
   // createUser({ id: '1112', name: 'pizza', username: 'pizzacompany', email: 'pizza@mail.com', phone: '1112', type: 'user', password: '' })
    findUser('permm')
    //   deleteUser('1112')
    //setUser({ id: 'permm', name: 'Nawat', username: 'permm', email: 'Test@mail.com', phone: '123456', type: 'user', password: '1234' })
    readUser()
    checkUser('permm', 'test')
    
}) 
</script>
<template>
    <div class="w-full mx-auto">
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
            <input type="text" v-model="username" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
            <input type="password" v-model="password" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-8 w-1/2 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20 mr-10" @click="checkUser(username,password)"
                :class="theme.primarybutton">Log In</button> 
                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="register"
                :class="theme.primarybutton">Register</button>
        </div>
    </div>
    
</template>