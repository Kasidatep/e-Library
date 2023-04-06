<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '../composables/announcementAndPosts'
import { getDateFormat } from '../composables/dateFormat'
const theme = inject(['theme'])
const route = useRoute()
const id = route.params.id
const post = ref({})
onMounted(async () => {
    post.value = await getPostById(id)
}) 

const shareLocation = window.location
</script>
<template>
    <div class="w-screen h-screen overflow-x-hidden">
        
        <div class="absolute w-screen h-[30rem] overflow-hidden object-center opacity-20">
            <img :src="post?.img??'../default/coverpost.png'" class="w-full h-fit object-center  bg-transparen z-0 blur-sm" alt="">
        </div>
        <div class="flex relative w-screen h-screen justify-center z-0" v-if="post?.title==undefined">
            <div class="pt-24 mt-24 md:mt-40 mx-3 w-full md:w-9/12 text-xl font-bold text-center rounded-t-3xl" :class="theme.bgbase, theme.text">
                You dont't have permistion to access this contents.
                </div>
        </div>
        

        <div class="flex relative w-screen h-screen justify-center z-0" v-if="post?.title!==undefined">

            <div class=" mt-24 md:mt-40 mx-3 w-full md:w-9/12 lg:w-3/5 rounded-t-3xl" :class="theme.bgbase">
                <div class=" z-0 " v-if="(post.img?.length>10)">
                    <img :src="post.img" class="w-full h-fit rounded-t-3xl z-0" alt="">
                </div>
                <div class="text-3xl pt-5 font-extrabold w-full text-center" :class="theme.textheader">{{ post.title }}
                </div>

                <div class="flex justify-center">
                    <img :src="post.user?.img ?? '../default/profile.png'" class="ml-5 h-8 w-8 rounded-full " />
                    <div class="ml-2 h-6 w-fit flex flex-col md:flex-row justify-start align-middle text-sm md:text-md my-auto"
                        :class="theme.text">
                        By.. {{ post.user?.name }} | At {{ getDateFormat(post.postDate) }}
                    </div>
                </div>

                <div class="z-10 w-full p-5 text-xl indent-10 leading-relaxed break-words hyphens-auto" lang="th"
                    :class="theme.bgbase, theme.text">
                    <span v-html="post.description"></span>
                </div>
                <hr>
                <div class="flex pb-24 pt-5">
                    <a class="mx-5 px-5 py-3 w-full text-center font-normal text-white bg-[#3b5998]" :href="`http://www.facebook.com/share.php?u=${shareLocation}`">
                        Share to Facebook
                    </a>
                    <a class="mx-5 px-5 py-3 w-full text-center font-normal text-white bg-[#00acee]" :href="`https://twitter.com/intent/tweet?text=${shareLocation}`">
                        Share to Twitter
                    </a>
                </div>
            </div>

        </div>

    </div>
</template>