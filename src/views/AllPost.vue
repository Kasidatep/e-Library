<script setup>
import { inject, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getPosts } from '../composables/announcementAndPosts'
import { getDateFormat } from '../composables/dateFormat'
const theme = inject(['theme'])
const posts = ref([])

onMounted(async () => {
    posts.value = await getPosts()
})
</script>
<template>
    <div class="flex justify-center w-full pt-32">
        <div class="w-[70%] ">
            <div class="text-3xl font-bold w-full text-center" :class="theme.textheader">All Post</div>
            
            <div v-for="(post, index) in posts"
                class="text-white bg-opacity-50 flex flex-col m-1 w-2/3 mx-auto mt-5 rounded-lg" :class="theme.bgblock">
                <img :src="post.img" alt="" class="m-2 rounded-lg" srcset="">
                <div :class="theme.text" class="text-2xl px-5 font-semibold"> {{ post.title }} </div>
                <div :class="theme.text" class="text-lg px-5 truncate "> {{ post.description }} </div>
                <div class="flex h-10 mt-2">
                    <div class="mx-1 flex">
                        <img :src="post.user.image ?? './default/profile.png'" class="ml-5 h-8 w-8 rounded-full" />
                        <div class="ml-2 pt-1 h-8 w-fit">by.. {{ post.user.name }} At {{ getDateFormat(post.postDate) }}</div>
                    </div>
                    <RouterLink :to="{ name: 'onepost', params: { id: post.id ?? 'notfound' } }" class="p-1 h-8 mb-2 w-fit text-right cursor-pointer mr-2 ml-auto rounded-sm"
                        :class="theme.primarybutton"> Read More >> </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>