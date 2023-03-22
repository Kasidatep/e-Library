<script setup>
import { ref, computed, onMounted, inject  } from 'vue'
// import { readUser, createUser, findUser, deleteUser, setUser, checkUser } from '../composables/accountManagement'
import { readUser, checkUser, deleteUser, createUser } from '../composables/accountManagement'
const theme =  inject('theme')
const users = ref([])
const username = ref('permm')
const password = ref('1234')
const login = ref('')
const createuser = ref('')
const deleteuser = ref('Test')
onMounted(async () => {
    users.value = await readUser()
    console.log(users.value)
    login.value = await checkUser(username.value, password.value)
    console.log(login.value)
    createuser.value = await createUser({id:'Test',name: 'test99',username: 'username',email: 'Test@mail.com',phone: '123456',type: 'user',password: 'test'})
    users.value = await readUser()
    console.log(users.value)
    // deleteuser.value = await deleteUser(deleteuser.value)
    // console.log(deleteuser.value)
    
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
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20 mr-10" @click="login"
                :class="theme.primarybutton">Log In</button> 
                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="register"
                :class="theme.primarybutton">Register</button>
        </div>
    </div>
    
</template>