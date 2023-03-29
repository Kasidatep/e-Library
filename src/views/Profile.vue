<script setup>
import { ref, computed, inject, onMounted, onUpdated } from 'vue'
import Catagories from '../components/Catagories.vue';
import ItemLists from '../components/ItemLists.vue'
import CreateAndUpdatePost from '../components/CreateAndUpdatePost.vue';
import CreateAndUpdateBook from '../components/CreateAndUpdateBook.vue';
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts'
import BorrowBookList from '../components/BorrowBookList.vue';
import { getBooks, updateBookById, createBook, deleteBookById } from '../composables/booksFetch.js'
import Edituser from '../components/Edituser.vue';
import { clearUser } from '../composables/accountManagement'
import { updateBorrowBook, getBorrowBookById } from '../composables/borrowBook.js'

const user = inject('user')
const theme = inject('theme')
const emits = defineEmits([ 'showlogin', 'userstatus', 'logout'])
const isUser = computed(() => user.value.type == 'user')

const posts = ref([])
const books = ref([])
const borrows = ref([])
const bookUpdateItem = ref({})
const isUpdateBook = ref(false)
const page = ref(11)

// User
const updateuser = async (userupdated) => {
    if(await userupdated === 'passnotmatch'){ 
        createNotification("warning", "Password not match!!", 2500)
     }
    else {
    createNotification("success", "Update Success from Profile", 2500)
    console.log(await userupdated)
    user.value = await userupdated }
}

const deleteuser = async ()=>{
    createNotification("success", "Delete Success Profile", 2500)
    // console.log( 'deleted '+ await deleted)
    user.value = {}
}

const updateBrBookById = async (id) => {
    // borrows.value = await getBorrowBookById()  
    console.log(borrows.value?.findIndex(br => br.id === id ))
    const status = await updateBorrowBook(id)
    if(status==200){
        // borrows.value.splice(borrows.value.findIndex(b => b.id == id), 1, data)

         borrows.value =  await getBorrowBookById(user.id) 
         createNotification("success", "Night Successfully.", 2500)
    }
   else{
    createNotification("warning", "Cannot Night!", 2500)

   }
   
}



const createNewBook = async (newBook) => {
    let bookObj = books.value?.find(book => book.id === newBook.id)
    console.log(bookObj)
    let noti = []
    if (newBook.id === bookObj?.id) {
        createNotification("danger", "Sorry, ISBN already exits. Please enter new ISBN", 2500)
        return false
    }
    if (newBook?.id.length !== 13 && newBook?.id.length !== 11) {
        createNotification("danger", "Sorry, ISBN should be 11 or 13 digits", 2500)
        return false
    }
    if (newBook.id == null || newBook.id == "") noti.push('ISBN')
    if (newBook.title == null || newBook.title == "") noti.push('Title')
    if (newBook.author == null || newBook.author == "") noti.push('Author')
    if (newBook.publisher == null || newBook.publisher == "") noti.push('Publisher')
    if (newBook.maincatagory == null || newBook.maincatagory == "") noti.push('Main Catagory')
    if (newBook.subcatagory == null || newBook.subcatagory == "") noti.push('Sub Catagory')
    if (newBook.booklink == null || newBook.booklink == "") noti.push('Book Link')
    if (newBook.img == null || newBook.img == "") noti.push('Image Book URLs')
    if (noti.length > 0) {
        createNotification("warning", "Sorry, " + noti.join(", ") + " can not empty.", 2500)
        return false
    }

    if (newBook.subcatagory.includes(",")) {
        newBook.subcatagory = newBook.subcatagory.split(",")
    } else {
        newBook.subcatagory = [newBook.subcatagory]
    }
    const status = await createBook(newBook)
    if (status == 201) {
        books.value.push(newBook)
        createNotification("success", "Create New Book Successfully.", 2500)
    } else {
        createNotification("warning", "Cannot Create New Book " + newBook.id, 2500)
    }
}

const deleteBook = async (bookId) => {
    const status = await deleteBookById(bookId)
    if (status == 200) {
        books.value = books.value.filter(book => book.id !== id)
        createNotification("success", "Delete Book" + id + " successfully.", 2500)
    } else {
        createNotification("warning", "Cannot Delete Book Id " + bookId, 2500)
    }
}

const updateBook = async (updateBook) => {
    let noti = []
    if (updateBook.title == "") noti.push('Title ')
    if (updateBook.author == "") noti.push('Author ')
    if (updateBook.publisher == "") noti.push('Publisher ')
    if (updateBook.subcatagory == "") noti.push('SubCatagory ')
    if (updateBook.booklink == "") noti.push('Book Link ')
    if (updateBook.img == "") noti.push('Image Book URLs ')
    if (noti.length > 0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }

    updateBook.subcatagory = updateBook.subcatagory.split(",")
    const status = await updateBookById(updateBook)
    if (status == 200) {
        books.value.splice(books.value.findIndex(book => book.id === updateBook.id), 1, updateBook)
        createNotification("success", "Update Book " + updateBook.id + " successfully.", 2500)
        isUpdateBook.value = false
    } else {
        createNotification("warning", "Cannot Update Book Id " + updateBook.id, 2500)
    }
}

const updateBookId = (bookId) => {
    bookUpdateItem.value = books.value.find(book => bookId === book.id)
    if (bookUpdateItem.value.subcatagory.length > 0) bookUpdateItem.value.subcatagory = bookUpdateItem.value.subcatagory.join(', ')
    isUpdateBook.value = true
}



// ---- Post --------------------------------------------

const editpost = async (data, isUpdate) => {
    if (user.value?.id === undefined) {
        createNotification("warning", "Sorry, Please login first", 2500)
        return false
    }
    if (!isUpdate && posts.value.some(post => post.id == data.id)) {
        createNotification("warning", "Sorry post " + data.id + " exists, please try again with a new custom post URL.", 2500)
        return false
    }

    let noti = []
    if (data.title == null || data.title == "") noti.push('Title ')
    if (data.description == null || data.description == "") noti.push('Description ')
    if (data.img == null || data.img == "") noti.push('Image post URLs ')
    if (noti.length > 0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }
    let status
    // posts.value = await getPosts()

    if (isUpdate) {
        const isUpdatedObj = posts.value?.find(p => p.id == data?.id)
        data.postDate = isUpdatedObj.postDate
        data.userId = isUpdatedObj.userId
        status = await updatePostById(isUpdatedObj.id, data)
        if (status == 200) {
            posts.value.splice(posts.value.findIndex(p => p.id == isUpdatedObj.id), 1, data)
            createNotification("success", "Update POST " + data.title + " successfully.", 2500)
            isEditPost.value = false
        }
    }
    else {
        data.userId = user.value.id
        status = await createPost(data)
        if (status == 201) {
            posts.value = await getPosts()
            createNotification("success", "Create POST " + data.title + " successfully.", 2500)
        }
    }
}
const postEditItem = ref({})
const isEditPost = ref(false)
const editPostById = async (postId) => {
    posts.value = await getPosts()
    postEditItem.value = posts.value.find(apost => apost.id == postId)
    if (postEditItem.value === undefined) return false
    isEditPost.value = true
}

const deletePost = async (id) => {
    const post = await posts.value.find(post => post.id === id);
    const status = await deletePostById(id)
    if (status == 200) {
        posts.value = posts.value.filter(i => i.id !== id)
        createNotification("success", "Delete " + post.title + " successfully.", 2500)
    } else {
        createNotification("warning", "Cannot Delete " + post.title, 2500)
    }
}

onMounted(async () => {
    posts.value = await getPosts()
    books.value = await getBooks()
    borrows.value =await getBorrowBookById()
    if(await user.value!==undefined){
        borrows.value = await getBorrowBookById(user.value.id)
    }
})

const mapPosts = () => {
    let postsMap = []
    posts.value.forEach(post => {
        postsMap.push({ id: post.id, title: post.title, value: post.visible == 1 ? 'PUBLIC' : 'MEMBER' })
    })
    return postsMap
}

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
            <div class="text-lg pl-5 mb-2 pr-2">{{ notification.message }}</div>
        </div>
    </div>
    <div class="w-screen h-screen pt-36 flex justify-center" v-if="(user?.id == undefined)">
        <div class="text-3xl font-bold text-center w-fit h-fit px-24 py-8 rounded-lg" :class="theme.text, theme.bgblock">
           Plese Log In First!!
        </div>
    </div>
    <div class="w-full h-full pt-20 flex" v-if="!(user?.id == undefined)">
        <div class="px-3 w-screen h-screen bg-opacity-70 fixed bg-blur pt-24 z-10" :class="theme.bgbase"
            v-if="isEditPost || isUpdateBook">
            <div class="w-full md:w-2/3 flex-col h-3/5 bg-opacity-90 justify-center mx-auto mt-auto mb-auto rounded-xl z-20  overflow-auto p-5"
                :class="theme.bgblock">
                <div class="flex justify-end -mb-20 cursor-pointer">
                    <div class="border-2 h-fit p-2 rounded-full z-10" :class="theme.text"
                        @click="() => { isEditPost = false, isUpdateBook = false }">ClOSE</div>
                </div>
                <CreateAndUpdatePost :post="postEditItem" :isUpdate="true" @createPost="editpost($event, true)"
                    v-if="isEditPost" />
                <CreateAndUpdateBook @createBook="updateBook" :book="bookUpdateItem" :isUpdate="true" v-if="isUpdateBook" />
            </div>
        </div>
        <div class="w-[25%] h-screen fixed bg-opacity-40" :class="theme.bgblock">
            <div class="flex flex-col h-fit overflow-y-scroll">
                <div class="pt-16 flex justify-center">
                    <img :src="user.image ?? '../default/profile.png'" class="h-56 w-56 bg-gray-700 rounded-full">
                </div>
                <div class="text-3xl text-center mt-4 mb-4 uppercase" :class="theme.textheader">
                    {{ user?.name ?? 'Guest User' }}
                </div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser" @click="page=21">เพิ่มหนังสือใหม่</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser" @click="page=22">สร้างโพสต์ใหม่</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page=11">รายการหนังสือทั้งหมด</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page=23">รายการโพสต์ทั้งหมด</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page=12">รายการหนังสือที่ถูกยืม</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="isUser">หนังสือที่ชอบ</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" @click="page=12">รายการการยืม</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="isUser" @click="page=23">ประวัติการยืมของฉัน</div>
                <div class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" @click="page=13">แก้ไขข้อมูลผู้ใช้</div>
                <div @click="$emit('logout', clearUser())"
                    class="cursor-pointer text-3xl text-center mx-8 rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 bg-red-600 text-white">
                    ออกจากระบบ
                </div>
            </div>
        </div>
        <div class="w-[75%] h-full ml-[25%]">
                <ItemLists v-if="page == 11" :items="books"
                    :config="{ header: 'รายการหนังสือทั้งหมด', subname: 'หมวดหมู่', action1: 'แก้ไข', action2: 'ลบ', subvalue: 'maincatagory' }"
                    @event1="updateBookId" @event2="deleteBook" />
                <CreateAndUpdateBook v-if="page == 21" @createBook="createNewBook" />
                <ItemLists v-if="page == 23" :items="mapPosts()"
                    :config="{ header: 'รายการโพสต์ทั้งหมด', subname: 'Status', action1: 'แก้ไข', action2: 'ลบ', subvalue: 'value' }"
                    @event1="editPostById" @event2="deletePost" />
                <CreateAndUpdatePost v-if="page == 22" :isUpdate="false" @createPost="editpost" />
                <BorrowBookList v-if="page == 12" @updateBorrowBook="updateBrBookById" :borrows="borrows" />
                <Edituser v-if="page == 13" @updateuser="updateuser" @deleteuser="deleteuser"/>
            
        </div>
    </div>
</template>
 
<style scoped></style>