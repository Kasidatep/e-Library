<script setup>
import { ref, computed, onMounted, inject  } from 'vue'
import { readUser, createUser, findUser, deleteUser, updateUser, checkUser } from '../composables/accountManagement'
const theme =  inject('theme')
const user = inject('user')
const username = ref('permm')
const password = ref('1234')
// const login = ref('')
const emits = defineEmits(['login','register'])

onMounted(async () => {
   
   // createUser({ id: '1112', name: 'pizza', username: 'pizzacompany', email: 'pizza@mail.com', phone: '1112', type: 'user', password: '' })
   // findUser('permm')
    //   deleteUser('1112')
    //setUser({ id: 'permm', name: 'Nawat', username: 'permm', email: 'Test@mail.com', phone: '123456', type: 'user', password: '1234' })
    // console.log(await users.value)
    // readUser()
    // console.log(user.value)
    
}) 

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
    <div class="w-full mx-auto">
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Username</div>
            <input type="text" v-model="username" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-12 w-1/2">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Password</div>
            <input type="password" v-model="password" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-8 w-1/2 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20 mr-10" @click="$emit('login',checkUser(username,password))"
                :class="theme.primarybutton">Log In</button> 
                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="register"
                :class="theme.primarybutton">Register</button>
        </div>
    </div>
    
</template>