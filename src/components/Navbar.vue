<script setup>
import IcBaselineLightMode from './icons/IcBaselineLightMode.vue';
import { RouterLink } from 'vue-router'
import { inject, ref, onMounted } from 'vue'
const showSearch = ref(false)
defineEmits(['changeTheme', 'goProfile'])
const selectedtheme = ref('dark')
const {user} = inject('user')
const theme = inject('theme')
const allTheme = ['dark', 'bright', 'sepia', 'night']
let currentTheme = 1
const nextTheme = () => {

    if (currentTheme < allTheme.length) {
        const newTheme = allTheme[currentTheme++]
        selectedtheme.value = newTheme
        return newTheme
    }
    else {
        currentTheme = 0
        selectedtheme.value = allTheme[currentTheme]
        return allTheme[currentTheme]
    }
}

onMounted(() => {
    const sesusername = sessionStorage.getItem("boi-auth")
    if (!(user.value?.id === undefined)) {
        selectedtheme.value = (localStorage.getItem(`boi-theme-${user.value?.id}`)) !== null ? (localStorage.getItem(`boi-theme-${user.value?.id}`)) : 'dark'
    } 
    if(user.value.id === undefined) {
        selectedtheme.value = sessionStorage.getItem(`boi-theme-${sesusername}`)
    }

    // selectedtheme.value = props.themeName
})

let isOpen = ref(false)
</script>
 
<template>
    <div class="w-full lg:h-20 flex flex-col lg:flex-row justify-between border-b-1 fixed z-40" :class="theme.nav">
        <div class="h-20 mx-5 pt-1 flex justify-between">
            <div class="flex justify-center items-center" :class="theme.text">
                <img src="../assets/image/logo.png" class="w-[65px] brightness-200">
            </div>
            <div class="w-24 text-center h-fit p-3 mt-2 lg:hidden cursor-pointer rounded" @click="isOpen = !isOpen" :class="theme.text, theme.primarybutton">
                {{ !isOpen?'MENU':'HIDE' }}
            </div>
        </div>
        <div class="flex w-full justify-start p-2 flex-col lg:flex-row text-center lg:inline-flex"
            :class="isOpen ? '' : 'hidden'">
            <div class="flex flex-col lg:flex-row pl-4 2xl:text-2xl text-xl font-medium lg:w-full" :class="theme.nav">
                <RouterLink class="justify-self-center cursor-pointer px-2 py-3 my-2 mx-2 bg-opacity-30 rounded-lg"
                    :class="theme.bgbase" :to="{ name: 'books' }" @click="isOpen=false">
                    หนังสือทั้งหมด
                </RouterLink>
                <RouterLink class="justify-self-center cursor-pointer px-2 py-3 my-2 mx-2 bg-opacity-30 rounded-lg"
                    :class="theme.bgbase" v-if="!(user?.id == undefined)" :to="{ name: 'profile', params: { id: user.id } }" @click="isOpen=false">
                    จัดการหนังสือ
                </RouterLink>
                <RouterLink class="justify-self-center cursor-pointer px-2 py-3 my-2  mx-2 bg-opacity-30 rounded-lg"
                    :class="theme.bgbase" v-if="(user?.id == undefined)" @click="$emit('goProfile'),isOpen=false"
                    :to="{ name: 'profile', params: { id: 'login' } }" >
                    รายการการยืม
                </RouterLink>
                <RouterLink class="justify-self-center cursor-pointer px-2 py-3 my-2  mx-2 bg-opacity-30 rounded-lg"
                    :class="theme.bgbase" :to="{ name: 'posts' }" @click="isOpen=false">
                    โพสต์
                </RouterLink>
            </div>
            <hr class="my-3" v-if="isOpen">
            <!-- search -->
            <div class="flex justify-center w-full lg:w-fit pt-5 pl-3 pr-2">
                <div class="flex justify-center pr-4">
                    <input type="search" placeholder="ค้นหาหนังสือ" class="flex justify-end rounded-md pl-3 h-9 w-64 lg:w-24"
                        :class="(isOpen?'':'hidden'),theme.text, theme.input">
                </div>
                <!-- iconSearch -->
                <!-- <div class="w-[5%] text-xl" @click="showSearch = !showSearch">
                    <MaterialSymbolsSearchSharp class="cursor-pointer" :class="theme.text" />
                </div> -->

            </div>

            <div class="pt-2 text-xl flex justify-center items-center mr-3">
                <IcBaselineLightMode class="cursor-pointer mr-2" :class="theme.text"
                    @click="$emit('changeTheme', nextTheme())" />
                <select v-model="selectedtheme"
                    class="font-semibold bg-opacity-30 rounded-lg w-24 text-center border-dash border-2 border-black"
                    :class="theme.input" @change="$emit('changeTheme', $event.target.value)">
                    <option value="dark" class="bg-black text-white font-semibold">Dark</option>
                    <option value="bright" class="bg-white font-semibold text-black">Bright</option>
                    <option value="sepia" class="bg-yellow-500 font-semibold">Sepia</option>
                    <option value="night" class="bg-[#999999] text-black font-semibold">Night</option>
                </select>

            </div>
            <div class="flex justify-center pt-2">
                <RouterLink :to="{ name: 'profile', params: { id: user?.id ?? 'login' } }" 
                class="w-fit  mr-10 border-2 border-black rounded-lg flex" @click="$emit('goProfile'), isOpen=false">
                <div class="p-2 w-16">
                    <img :src="user.image?.length>10 ?user?.image: '../default/profile.png'" class="w-12 h-12 rounded-full text-3xl lg:-mt-1">
                </div>
                <!-- profile -->
                <div class="my-auto w-fit text-left">
                    <div class="text-lg font-bold pr-1 w-24"> My profile</div>
                    <div class="text-sm truncate pr-2"> {{ user?.name ?? 'Log In' }}</div>
                </div>


            </RouterLink>
            </div>
            
        </div>
    </div>
</template>
 
<style scoped></style>