<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { createUser} from '../composables/accountManagement'
const emits = defineEmits(['toLogIn', 'register'])
const theme = inject('theme')
const name = ref('')
const username = ref('')
const email = ref('')
const phone = ref('')
const type = ref('user')
const password = ref('')
const confpassword = ref('')
const imgurl = ref('')
const na = ref('')
const usr = ref('')
const em = ref('')
const ph = ref('')
const passwd = ref('')
const cpasswd = ref('')
const img = ref('')


const register = () => {
    if (password.value !== confpassword.value) {
        return 'passnotmatch'
    }
     if(username.value.length === 0 ){ 
        return 'usernameisnull'
    }if(password.value.length === 0 || confpassword.value.length ===0){
        return 'passwordisnull' 
    }
     else {
        return createUser({ name: name.value, username: username.value, email: email.value, phone: phone.value, type: type.value, password: password.value, confpassword: confpassword.value, image: imgurl.value })
    }

}
onMounted(()=>{
    usr.value.focus()
})
</script>
 
<template>
    <div class="fixed w-96 right-5 left-auto z-50 mt-24 ">

        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 mb-2 pr-2">{{ notification.message }}</div>
        </div>
    </div>
    <div>

        <div class="w-full mx-auto">


            <div class="flex flex-col md:flex-row mt-12 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Username</div>
                <input ref="usr" type="text" placeholder="username" v-model="username" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="na.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Name</div>
                <input ref="na" type="text" placeholder="name" v-model="name" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="em.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">E-Mail</div>
                <input ref="em" type="email" placeholder="email" v-model="email" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="ph.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Phone</div>
                <input ref="ph" type="text" placeholder="phone" v-model="phone" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="img.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Image Profile URL</div>
                <input ref="img" type="url" placeholder="imageurl" v-model="imgurl" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="passwd.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Password</div>
                <input ref="passwd" type="password" placeholder="password" v-model="password" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="cpasswd.focus()">
            </div>
            <div class="flex flex-col md:flex-row mt-3 h-24 md:h-12">
                <div class="text-lg font-bold px-2 pt-2 w-48" :class="theme.text">Confirm Password</div>
                <input ref="cpasswd" type="password" placeholder="confirmpassword" v-model="confpassword" class="w-full rounded-lg h-12 pl-5" :class="theme.input" @keyup.enter="$emit('register', register()), $emit('toLogIn')">
            </div>
            
            <div class="flex mt-8 w-full justify-end cursor-pointer">
                <div class=" py-3 mr-5 text-md cursor-pointer hover:drop-shadow-xl" :class="theme.text">Already have an
                    account?
                    <a class="font-extrabold underline decoration-2" @click="$emit('toLogIn')">LogIn</a>
                </div>

                <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20"
                    @click="$emit('register', register()), $emit('toLogIn')" 
                    :class="theme.primarybutton">Register</button>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>