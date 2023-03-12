<script setup>
import MaterialSymbolsSearchSharp from './icons/MaterialSymbolsSearchSharp.vue';
import IcBaselineLightMode from './icons/IcBaselineLightMode.vue';
import GgProfile from './icons/GgProfile.vue';
import {ref, computed} from 'vue'
const showSearch = ref(false)
defineEmits(['changeTheme','goProfile'])
const selectedtheme = ref('dark')
const user = ref({type:'user',image:'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'})
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
const allTheme = ['dark','bright','sepia','night']
let currentTheme = 1
const nextTheme = ()=>{
    if(currentTheme < allTheme.length){
         return allTheme[currentTheme++]
    }
    else {
    currentTheme = 0
    return allTheme[currentTheme]
    }
}
</script>
 
<template>
    <div class="w-full h-20 flex items-center border-b-1 fixed z-50" :class="themes.bgnav">
        <!-- logo -->
        <div class="w-[10%] flex justify-center items-center" :class="themes.text">
            <img src="../assets/image/logo.png" class="w-[70px] brightness-200" >
        </div>
        <!-- catagory -->
        <div class="w-[45%] grid grid-cols-4 pl-4 text-2xl font-medium "  :class="themes.text">
            <div @click="checkTheme" class="grid justify-self-center cursor-pointer">
                หมวดหมู่
            </div>
            <div class="grid justify-self-center cursor-pointer">
                ประเภทหนังสือ
            </div>
            <div class="grid justify-self-center cursor-pointer">
                สำนักพิมพ์
            </div>
            <div class="grid justify-self-center cursor-pointer">
                รายการหนังสือ
            </div>
        </div>
        <!-- search -->
        <div class="w-[25%] flex justify-end pr-4">
            <input type="search" placeholder="ค้นหาหนังสือ" class="flex justify-end rounded-md pl-3 h-9 w-64" :class=" themes.text, themes.input" v-show="showSearch">
        </div>
        <!-- iconSearch -->
        <div class="w-[5%] text-xl" @click="showSearch = !showSearch" >
            <MaterialSymbolsSearchSharp class="cursor-pointer" :class="themes.text"/>
        </div>
        <div class="w-[10%] text-xl flex justify-center items-center" >
        <IcBaselineLightMode class="cursor-pointer mr-2" :class="themes.text" @click="$emit('changeTheme', nextTheme())"/>
            <select v-model="selectedtheme" class="font-semibold bg-opacity-30 rounded-lg w-24 text-center border-dash border-2 border-black" :class="themes.input" @change="$emit('changeTheme', $event.target.value)"> 
                <option value="dark" selected class="bg-black text-white font-semibold">Dark</option>
                <option value="bright" class="bg-white font-semibold text-black">Bright</option>
                <option value="sepia" class="bg-yellow-500 font-semibold">Sepia</option>
                <option value="night" class="bg-[#999999] text-black font-semibold">Night</option>
            </select>
           
        </div>
        <!-- profile -->
        <img :src="user.image" class="w-16 h-16 rounded-full text-3xl" @click="$emit('goProfile')">
        
    </div>
</template>
 
<style scoped>

</style>