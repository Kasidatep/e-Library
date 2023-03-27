<script setup>
import { computed, ref, onMounted, inject , onUpdated} from 'vue';
const emits = defineEmits(['createPost'])
const theme = inject('theme')
const props = defineProps(['post','isUpdate'])
console.log(props.isUpdate)
const vs = ref(1)
const imgUrl = ref(null)
const title = ref(null)
const description = ref(null)
const customUrl = ref(null)
const isPublic = ref(true)
const isAdvance = ref(false)
const notifications = ref([])
const post = ref(null)
const isCreatePost = ref(true)
const postEdit = ref({
    id: customUrl.value == null ? null : customUrl.value,
    title: title.value,
    description: description.value,
    img: imgUrl.value,
    visible: isPublic.value ? 1 : 2
})


const mapInput = () => {
    if (props.post !== undefined) {
        customUrl.value = props.post.id
        title.value = props.post.title
        description.value = props.post.description
        isPublic.value = props.post.visible == 1
        imgUrl.value = props.post.img
    }
}

onMounted(() => {
    post.value = props.post
    mapInput()
})

onUpdated(()=>{
    postEdit.value = {
    id: customUrl.value == null ? null : customUrl.value,
    title: title.value,
    description: description.value,
    img: imgUrl.value,
    visible: isPublic.value ? 1 : 2
    }
})
</script>
<template>
    <div class="fixed w-96 right-5 left-auto z-0 mt-24">
        <div class="flex-col h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
        </div>
    </div>

    <div class="flex flex-col m-5 z-10">

        <div class="flex mt-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Title</div>
            <input type="text" v-model="title" class="w-full rounded-lg pl-5" :class="theme.input">
        </div>
        <div class="flex mt-12 h-min">
            <div class="text-xl font-bold px-5 pt-2  w-48" :class="theme.text">Description</div>
            <textarea type="text" class="w-full rounded-lg pl-5 pt-2 h-48" v-model="description"
                :class="theme.input"></textarea>
        </div>
        <div class="flex my-12 h-12 ">
            <div class="text-xl font-bold px-5 pt-2 w-48" :class="theme.text">Image URL</div>
            <input type="url" class="w-full rounded-lg pl-5" v-model="imgUrl" :class="theme.input">
        </div>
        <hr class="opacity-30">
        <div v-if="isAdvance">
            <div class="flex mt-12 h-12 ">
                <div class="text-xl font-bold px-5 pt-2 w-72" :class="theme.text">Custom URLs post</div>
                <input type="text" class="w-full rounded-lg pl-5" v-model="customUrl" :class="theme.input"
                    :disabled="isUpdate">
            </div>
            <div class="flex mt-12 h-12 w-full">
                <div class="text-xl font-bold px-5 pt-2 w-72" :class="theme.text">Visible Status</div>
                <label for="vs_public" class="text-xl mr-5 pt-2 px-3 rounded-lg w-fit"
                    :style="isPublic ? 'border-color: yellow; border-width: 2px;' : ''" @click="isPublic = true"
                    :class="theme.input">ALL USER</label>
                <label for="vs_private" class="text-xl pt-2 px-3 rounded-lg"
                    :style="isPublic ? '' : 'border-color: yellow; border-width: 2px;'" @click="isPublic = false"
                    :class="theme.input">ONLY SIGN IN USER</label>
                <input type="radio" id="vs_public" value="1" class="hidden" v-model="vs" :class="theme.input">
                <input type="radio" id="vs_private" value="2" class="hidden" v-model="vs" :class="theme.input">
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-fit text-center mt-8 px-16 border-2 p-2 rounded-full font-bold cursor-pointer"
                :class="theme.primarybutton" @click="isAdvance = !isAdvance">{{ isAdvance ? 'Hide' : 'Show' }} Advance
                Option</div>
        </div>
        <div class="flex mt-8 justify-end cursor-pointer">
            <button class="px-8 py-3 rounded-lg text-2xl cursor-pointer hover:drop-shadow-xl z-20" @click="$emit('createPost',postEdit)"
                :class="theme.primarybutton">{{isUpdate?'Save Change':'Create now'}}</button>
        </div>
    </div>
</template>
<style></style>