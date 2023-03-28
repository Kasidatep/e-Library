<script setup>
import { ref, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {getBookById} from '../composables/booksFetch'
const route = useRoute()
const id = route.params.id
const bookId = ref({})
onMounted(async () => {
  bookId.value = await getBookById(id)
}) 
</script>
<template>
    <div class="pt-40 text-white">
        {{ id }}
        {{ bookId.title }}
    </div>
    
</template>