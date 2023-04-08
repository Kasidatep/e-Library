<script setup>

import { ref, onMounted, inject } from 'vue'
import { getUser, updateType } from '../composables/accountManagement'
const {user} = inject('user')
const theme = inject('theme')
const allUser = ref([])
const passad = ref('')
const whoChange = ref('')
const showDialog = ref(false)
onMounted(async () => {
    allUser.value = await getUser()
})

const changeType = async (id) => {
    if (user.value.password == passad.value) {
        const updated = allUser.value.find(user => user.id === id)
        updated.type = updated.type == 'user' ? 'labrarian' : 'user'
        const status = await updateType(id)
        if (status === 200) {
            createNotification("success", "Update type success", 2500)
        } else {
            createNotification("danger", "You do not have permission!!", 2500)
        }
    } else if (passad.value.length === 0) {
        createNotification("warning", "Please entry password", 2500)
        showDialog.value = true
    }
    else {
        createNotification("warning", "Password is incorrect!!", 2500)
    }

    passad.value = ''

}
const setChangeType = async (id) => {
    showDialog.value = true
    whoChange.value = id
}

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

const getUserType = (type) => {
    return type === 'user' ? { theme: 'bg-sky-700', msg: 'CHANGE TO LIBRARIAN' } : { theme: 'bg-teal-600', msg: 'CHANGE TO USER' }
}

</script>
 
<template>
     <div class=" z-20 absolute top-5 w-full m-5 rounded-3xl" :class="theme.bgblock" v-show="showDialog">
            <div class=" p-10 h-2/4 w-full ">
                <div class="flex flex-col w-full">
                    <div class="text-lg font-bold px-2 pt-2  mb-3" :class="theme.text">Type password to confirm your
                        action!!</div>
                    <div class="flex w-full">
                        <input type="password" placeholder="Enter administrator password..." v-model="passad"
                            class="w-full rounded-lg h-12 pl-5" :class="theme.input">
                        <button class="rounded-lg h-12 ml-3 px-5 w-fit cursor-pointer hover:drop-shadow-xl "
                            @click="changeType(whoChange), showDialog = false" :class="theme.primarybutton">Confirm</button>
                    </div>

                </div>
            </div>
        </div>
    <div>
        <div class="fixed w-96 right-5 left-auto z-50 mt-24">
            <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
                v-for="notification in notifications">
                <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
                <hr class="mx-5 mt-2 opacity-20">
                <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
            </div>
        </div>
       
        <div class="pl-5 w-full pt-16">
            <h1 class=" font-bold lg:text-4xl text-3xl pt-10 mb-5" :class="theme.textheader">  การจัดการสิทธิผู้ใช้งาน </h1>
        <div class="w-full grid grid-flow-row">
            <div class="h-fit rounded-[20px] mb-6" :class="theme.itemlist">
                <div :class="theme.text" class="md:grid grid-cols-12 py-1 hidden">
                    <div class="text-2xl justify-self-center self-center px-4"></div>
                    <div class="col-span-4 text-xl pl-4 self-center">ชื่อ</div>
                    <div class="col-span-3 text-xl pl-4 self-center">
                        <div class="mt-1 flex overflow-hidden ">
                            <div class="w-fit py-[0.5em] rounded-md mx-1 font-semibold" > 
                               Current type
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
\            <div class="w-full grid grid-flow-row" v-for="thisUser in allUser">
            <div class="h-fit rounded-[20px] mb-4" :class="theme.profilebutton">
                <div :class="theme.text" class="grid grid-cols-12 py-2">
                    <div class="col-span-12 md:col-span-5 text-xl pl-8 self-center overflow-hidden ">{{ thisUser.name }}</div>
                    <div class="col-span-7 md:col-span-3 text-md pl-4 self-center">
                        <div class="flex overflow-hidden ">
                            <div class="px-3 w-fit py-[0.5em] rounded-md mx-1 text-md font-semibold" :class="theme.lable"> 
                                {{ thisUser.type.toUpperCase() }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-5 md:col-span-4 grid-flow-row flex justify-end mr-3">
                        <div class="col-span-5 w-full text-center mx-3 text-lg justify-self-center self-center px-2 py-2 rounded-md font-semibold cursor-pointer"
                            v-if="thisUser.type !== 'admin'" :class="getUserType(thisUser.type).theme"
                            @click="setChangeType(thisUser.id)"> {{ getUserType(thisUser.type).msg }}</div>
                   
                     
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
