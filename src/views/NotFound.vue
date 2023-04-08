<script setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>
<template>
    <div class="w-full mx-auto">
    
        <div class="w-screen h-screen pt-36 flex justify-center">
            <div>
                <div class="text-3xl font-bold text-center w-fit h-fit px-24 py-8 rounded-lg" :class="theme.text, theme.bgblock">
               Your Page is Not Found
            </div>
            <div class="text-center" :class="theme.text">
                <br> <a href="mailto:project203@kasidate.me" class="underline">Contact support</a> if you need further assistance.
            </div>
            </div>
            
        </div>  
    </div>
</template>

<style scoped></style>