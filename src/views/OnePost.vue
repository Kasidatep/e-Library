<script setup>
import { ref, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {getPostById} from '../composables/announcementAndPosts'
const route = useRoute()
const id = route.params.id
const post = ref({})
onMounted(async () => {
post.value = await getPostById(id)
}) 
</script>
<template>
    <div class="pt-40 text-white">
        {{ id }}
        {{ post.title }}
    </div>
    
</template>