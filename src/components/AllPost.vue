<script setup>
import { inject, onMounted,ref } from 'vue'
import { getPosts } from '../composables/announcementAndPosts'
const theme = inject(['theme'])
const posts = ref([])

onMounted(async () => {
    posts.value = await getPosts()
})
</script>
<template>
    <div class="flex justify-center w-full pt-24 test">
        <div class="w-[70%] test ">       
             <div class="text-3xl font-bold w-full text-center" :class="theme.textheader">Post</div>

            <div v-for="(post, index) in posts" class="text-white bg-opacity-50 flex flex-col m-1 w-2/3 mx-auto mt-5 rounded-lg"
                :class="theme.bgblock">
                <img :src="post.img" alt="" class="m-2 rounded-lg" srcset="">
                <div :class="theme.text" class="text-2xl px-5 font-semibold"> {{ post.title }} </div>
                <div :class="theme.text" class="text-lg px-5"> {{ post.description }} </div>
                <div class="p-2 mb-2 w-fit text-right cursor-pointer mr-2 ml-auto rounded-sm" :class="theme.primarybutton"> Read More >> </div>
                
            </div>
        </div>
    </div>
</template>