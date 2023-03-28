<script setup>
import { inject } from 'vue'
const theme = inject('theme')
</script>
<template>
    <div class="w-full mx-auto">
            <div class="flex mt-12 h-12">
                <div class="text-lg font-bold " :class="theme.text">Your Page is Not Found</div>
            </div>
    </div>
</template>

<style scoped></style>