<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import Catagories from './Catagories.vue';
import Itemlist from './Itemlist.vue'
import CreateAndUpdatePost from './CreateAndUpdatePost.vue';
import PostList from './PostList.vue';
import CreateAndUpdateBook from './CreateAndUpdateBook.vue';
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts'
import BorrowBookList from './BorrowBookList.vue';
import { getBooks, updateBookById, createBook, deleteBookById} from '../composables/booksFetch.js'
const user = inject('user')
const theme = inject('theme')
const isUser = computed(() => user.value.type == 'user')
// const props = defineProps(['books'])
const posts = ref([])
const books = ref([])
const bookUpdateItem = ref({})
const borrowBook = ref([])
const isUpdateBook = ref(false)

const createNewBook = async(newBook) => {
    let noti = []
    if(newBook.id==null||newBook.id=="") noti.push('ISBN ')
    if(newBook.title==null||newBook.title=="") noti.push('Title ')
    if(newBook.author==null||newBook.author=="") noti.push('Author ')
    if(newBook.publisher==null||newBook.publisher=="") noti.push('Publisher ')
    if(newBook.maincatagory==null||newBook.maincatagory=="") noti.push('Main Catagory ')
    if(newBook.subcatagory==null||newBook.subcatagory=="") noti.push('Sub Catagory ')
    if(newBook.booklink==null||newBook.booklink=="") noti.push('Book Link ')
    if(newBook.img==null||newBook.img=="") noti.push('Image Book URLs ')
    if(noti.length>0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }

    if(newBook.subcatagory.includes(",")){
        newBook.subcatagory = newBook.subcatagory.split(",")
    }else{
        newBook.subcatagory = [newBook.subcatagory]
    }
    const status = await createBook(newBook)
    if (status == 201) {
        books.value.push(newBook)
        createNotification("success", "Create New Book Successfully.", 2500)
    }else{
        createNotification("warning", "Cannot Create New Book "+ newBook.id, 2500)
    }
}

const deleteBook = async (bookId) => {
    const status = await deleteBookById(bookId)
    if (status == 200) {
        books.value = books.value.filter(book => book.id !== id)
        createNotification("success", "Delete Book"+id+" successfully.", 2500)
    }else{
        createNotification("warning", "Cannot Delete Book Id "+ bookId, 2500)
    }
}

const updateBook = async (updateBook) => {
    let noti = []
    if(updateBook.title=="") noti.push('Title ')
    if(updateBook.author=="") noti.push('Author ')
    if(updateBook.publisher=="") noti.push('Publisher ')
    if(updateBook.subcatagory=="") noti.push('SubCatagory ')
    if(updateBook.booklink=="") noti.push('Book Link ')
    if(updateBook.img=="") noti.push('Image Book URLs ')
    if(noti.length>0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }
    
    updateBook.subcatagory = updateBook.subcatagory.split(",")
    const status = await updateBookById(updateBook)
    if (status == 200) {
        books.value.splice(books.value.findIndex(book => book.id === updateBook.id), 1, updateBook)
        createNotification("success", "Update Book "+updateBook.id+" successfully.", 2500)
        isUpdateBook.value = false
    }else{
        createNotification("warning", "Cannot Update Book Id "+ updateBook.id, 2500)
    }
}

const updateBookId = (bookId) => {
    bookUpdateItem.value = books.value.find(book => bookId === book.id)
    if(bookUpdateItem.value.subcatagory.length > 0) bookUpdateItem.value.subcatagory = bookUpdateItem.value.subcatagory.join(', ')
    isUpdateBook.value = true
} 

//-------- updateBorrowBook-------------
// const updateBorrowBookId = (BrId)=>{
//     borrowBook.value = books.value.find(book => bookId === book.id)
//     borrowBook.value.subcatagory = bookUpdateItem.value.subcatagory.join(', ')
//     isUpdateBook.value = true
// }


// ---- Post --------------------------------------------

const editpost = async (data, isUpdate) => {
    let noti = []
    if(data.title==null||data.title=="") noti.push('Title ')
    if(data.description==null||data.description=="") noti.push('Description ')
    if(data.img==null||data.img=="") noti.push('Image post URLs ')
    if(noti.length>0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }
    let status
    posts.value = await getPosts()
    const isUpdatedObj = posts.value?.find(p => p.id == data?.id)
    console.log(isUpdatedObj)
    if (isUpdatedObj !== undefined && data.id !== null) {
        data.postDate = isUpdatedObj.postDate
        data.userId = isUpdatedObj.userId
        status = await updatePostById(isUpdatedObj.id, data)
        if (status == 200) {
            posts.value.splice(posts.value.findIndex(p => p.id == isUpdatedObj.id), 1, data)
            createNotification("success", "Update POST "+data.title+" successfully.", 2500)
            isEditPost.value = false
        }
    }
    else {
        data.userId = user.value.isUpdate
        status = await createPost(data)
        if (status == 201) {
             posts.value = await getPosts()
            createNotification("success", "Create POST "+data.title+" successfully.", 2500)
        }
    }
}
const postEditItem = ref({})
const isEditPost = ref(false)
const editPostById = async(postId) => {
    posts.value = await getPosts()
    postEditItem.value =  posts.value.find(apost => apost.id==postId) 
    if(postEditItem.value===undefined) return false
    isEditPost.value=true
}

const deletePost = async (id) => {
    const post = await posts.value.find(post => post.id === id);
    const status = await deletePostById(id)
    if (status == 200) {
        posts.value = posts.value.filter(i => i.id !== id)
        createNotification("success", "Delete "+post.title +" successfully.", 2500)
    }else{
        createNotification("warning", "Cannot Delete "+ post.title , 2500)
    }
}

onMounted(async () => {
    posts.value = await getPosts()
    books.value = await getBooks()
})

// Notification -----------------------------------------------------------------------------------
const notifications = ref([])
const createNotification = (type, message, timeout) => {
    let theme = ["bg-black", "text-white"]
    if (type == "warning") theme = ["bg-yellow-500", "text-black"]
    if (type == "success") theme = ["bg-green-500", "text-black"]
    if (type == "danger") theme = ["bg-red-500", "text-white"]
    notifications.value.push({ type: type, message: message, theme: theme })
    setTimeout(removeNotification, timeout)
}

const removeNotification = () => {
    notifications.value.shift()
}
</script>
 
<template>
    <div class="fixed w-96 right-5 left-auto z-0 mt-24">
        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 pt-1">{{ notification.message }}</div>
        </div>
    </div>
    <div class="w-full h-full pt-20 test flex">
        <div class="w-[25%] h-full fixed bg-opacity-40" :class="theme.bgblock">
            <div class="flex flex-col">
                <div class="pt-16 flex justify-center">
                    <img :src="user.image" class="h-56 w-56 bg-gray-700 rounded-full">
                </div>
                <div class="text-3xl text-center mt-4 mb-4 uppercase" :class="theme.textheader">{{ user?.name ?? 'Guest' }}
                </div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser">เพิ่มหนังสือใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser">สร้างโพสต์ใหม่</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser">รายการหนังสือทั้งหมด</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser">รายการหนังสือที่ถูกยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="isUser">หนังสือที่ชอบ</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="isUser">รายการการยืม</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="isUser">ประวัติการยืมของฉัน</div>
                <div class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton">แก้ไขข้อมูลผู้ใช้</div>
                <div
                    class="text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 bg-red-600 text-white">
                    ออกจากระบบ</div>
            </div>
        </div>
        <div class="w-[75%] h-full ml-[25%]">
            
            <div class="fixed w-2/3 m-auto h-2/3 rounded-xl z-20 bg-opacity-90 bg-blur overflow-auto p-5"  :class="theme.bgblock" v-if="isEditPost">
                <h1 class=" font-bold text-4xl pt-5" :class="theme.textheader">แก้ไขโพสต์ </h1>
                <CreateAndUpdatePost :post="postEditItem" :isUpdate="true" @createPost="editpost($event,true)" />
             </div>

            <div class="fixed w-2/3 m-auto h-2/3 rounded-xl z-20 bg-opacity-90 bg-blur overflow-auto p-5"  :class="theme.bgblock" v-if="isUpdateBook">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">แก้ไขหนังสือ </h1>
                <CreateAndUpdateBook @createBook="updateBook" :book="bookUpdateItem" :isUpdate="true"/>
            </div>
            
            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">เพิ่มหนังสือใหม่ </h1>
                <CreateAndUpdateBook @createBook="createNewBook"  />
            </div>

            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการหนังสือทั้งหมด </h1>
                <Itemlist :books="books" @updateBookById="updateBookId" @deleteBookById="deleteBook"/>
            </div>

            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการโพสต์ทั้งหมด </h1>
                <PostList :posts="posts"  @editPostById="editPostById" @deletePostById="deletePost"/>
            </div>

            <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">สร้างโพสต์ </h1>
                <CreateAndUpdatePost :isUpdate="false" @createPost="editpost($event,false)" />
        </div>


        <div class="pl-8 w-full" v-if="1">
                <h1 class=" font-bold text-4xl pt-16" :class="theme.textheader">รายการการยืมของ {{ user.name }} </h1>
                <BorrowBookList  />
            </div>
    </div>
</div>

</template>
 
<style scoped></style>