<script setup>
import MaterialSymbolsSearchSharp from './icons/MaterialSymbolsSearchSharp.vue';
import IcBaselineLightMode from './icons/IcBaselineLightMode.vue';
import { RouterLink } from 'vue-router'
import { inject, ref, onMounted } from 'vue'
const showSearch = ref(false)
defineEmits(['changeTheme', 'goProfile'])
const selectedtheme = ref('dark')
const user = inject('user')
const props = defineProps(['theme'])
const theme = inject('theme')
const allTheme = ['dark', 'bright', 'sepia', 'night']
let currentTheme = 1
const nextTheme = () => {
    if (currentTheme < allTheme.length) {
        return allTheme[currentTheme++]
    }
    else {
        currentTheme = 0
        return allTheme[currentTheme]
    }
}


</script>
 
<template>
    <div class="w-full h-20 flex items-center border-b-1 fixed z-50" :class="theme.nav">
        <!-- logo -->
        <div class="w-[10%] flex justify-center items-center" :class="theme.text">
            <img src="../assets/image/logo.png" class="w-[65px] brightness-200">
        </div>
        <!-- catagory -->
        <div class="w-[45%] flex space-x-6 pl-4 text-2xl font-medium " :class="theme.nav">

            <RouterLink class="grid justify-self-center cursor-pointer" :to="{ name: 'books' }">
                หนังสือทั้งหมด
            </RouterLink>
            <RouterLink class="grid justify-self-center cursor-pointer" v-if="!(user.id==undefined)"
                :to="{ name: 'profile', params: { id: user.id } }">
                หนังสือของฉัน
            </RouterLink>
            <RouterLink class="grid justify-self-center cursor-pointer"  v-if="(user.id==undefined)"
            :to="{ name: 'profile', params: { id:  'login' } }">
                หนังสือของฉัน
            </RouterLink>
            <RouterLink class="grid justify-self-center cursor-pointer" :to="{ name: 'posts' }">
                โพสต์
            </RouterLink>
        </div>
        <!-- search -->
        <div class="w-[25%] flex justify-end pr-4">
            <input type="search" placeholder="ค้นหาหนังสือ" class="flex justify-end rounded-md pl-3 h-9 w-64"
                :class="theme.text, theme.input" v-show="showSearch">
        </div>
        <!-- iconSearch -->
        <div class="w-[5%] text-xl" @click="showSearch = !showSearch">
            <MaterialSymbolsSearchSharp class="cursor-pointer" :class="theme.text" />
        </div>
        <div class="w-[10%] text-xl flex justify-center items-center mr-3">
            <IcBaselineLightMode class="cursor-pointer mr-2" :class="theme.text"
                @click="$emit('changeTheme', nextTheme())" />
            <select v-model="selectedtheme"
                class="font-semibold bg-opacity-30 rounded-lg w-24 text-center border-dash border-2 border-black"
                :class="theme.input" @change="$emit('changeTheme', $event.target.value)">
                <option value="dark" selected class="bg-black text-white font-semibold">Dark</option>
                <option value="bright" class="bg-white font-semibold text-black">Bright</option>
                <option value="sepia" class="bg-yellow-500 font-semibold">Sepia</option>
                <option value="night" class="bg-[#999999] text-black font-semibold">Night</option>
            </select>

        </div>
        <RouterLink :to="{ name: 'profile', params: { id: user.id ?? 'login' } }" class="w-48 mr-10 border-2 border-black rounded-lg flex" @click="$emit('goProfile')">
            <div class="p-2 w-16">
                <img :src="user.image ?? '../default/profile.png'" class="w-12 h-12 rounded-full text-3xl">
            </div>
            <!-- profile -->
            <div class="my-auto ">
                <div class="text-lg font-bold"> My profile</div>
                <div class="text-sm truncate"> {{ user.name ?? 'Log In' }}</div>
            </div>


        </RouterLink>

    </div>
</template>
 
<style scoped></style>