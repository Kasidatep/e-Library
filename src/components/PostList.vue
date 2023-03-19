<script setup>
import { getPosts } from '../composables/announcementAndPosts';
import { computed, ref } from 'vue';
const props = defineProps(['theme'])
const themes = computed(() => props.theme)
const data = ref(getPosts())

</script>
<template>

    <div class="overflow-hidden">
    <div class=" w-screen overflow-x-score flex">
        
    </div>
    </div>
    
</template>
<style></style>