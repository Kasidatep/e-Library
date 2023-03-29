<script setup>
import { inject, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getPosts } from '../composables/announcementAndPosts'
import { getDateFormat } from '../composables/dateFormat'
const theme = inject(['theme'])
const user = inject(['user'])
const posts = ref([])

onMounted(async () => {
    if(await user.value?.id===undefined) {
        const filterPost = await getPosts()
        posts.value = await filterPost?.filter(post => post.visible==1)
    }else{
        posts.value = await getPosts()
    }
    
})


</script>
<template>
    <div class="flex justify-center w-full pt-32">
        <div class="w-full md:w-[70%] px-5">
            <div class="text-3xl font-bold w-full text-center" :class="theme.textheader">All Post</div>

            <div v-for="(post, index) in posts"
                class="text-white bg-opacity-30 flex flex-col m-1 w-full md:w-6/8 lg:w-2/3 md:mx-auto mt-5 rounded-lg"
                :class="theme.bgblock">
                <img :src="post.img" alt="" class="m-2 rounded-lg " srcset="">
                <div :class="theme.text" class="text-2xl px-5 font-semibold"> {{ post.title }} </div>
                <div :class="theme.text" class="text-lg px-5 truncate "> {{ post.description }} </div>
                <div class="flex h-10 mt-2">
                    <div class="mx-1 flex ">
                        <img :src="post.user?.img ?? './default/profile.png'" class="ml-5 h-8 w-8 rounded-full " />
                        <div class="ml-2 h-8 w-fit flex flex-col md:flex-row justify-start align-middle">
                            <div class=" text-sm md:text-md my-auto" :class="theme.text">
                                By.. {{ post.user?.name }}
                            </div>
                            <div class="text-xs md:pl-2 md:text-md my-auto" :class="theme.text">
                                At {{ getDateFormat(post.postDate) }}
                            </div>
                        </div>
                    </div>
                    <RouterLink :to="{ name: 'onepost', params: { id: post.id ?? 'notfound' } }"
                        class="p-1 h-8 mb-2 w-fit text-right cursor-pointer mr-2 ml-auto rounded-sm"
                        :class="theme.primarybutton"> Read More >> </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>