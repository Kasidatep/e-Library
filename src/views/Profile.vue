<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import ItemLists from '../components/ItemLists.vue'
import CreateAndUpdatePost from '../components/CreateAndUpdatePost.vue';
import CreateAndUpdateBook from '../components/CreateAndUpdateBook.vue';
import { getPosts, createPost, updatePostById, deletePostById } from '../composables/announcementAndPosts'
import BorrowBookList from '../components/BorrowBookList.vue';
import { getBooks, updateBookById, createBook, deleteBookById } from '../composables/booksFetch.js'

import Edituser from '../components/Edituser.vue';
import { updateBorrowBook, getBorrowBook, getAllBorrowBook } from '../composables/borrowBook.js'
import HistoryBorrow from '../components/HistoryBorrow.vue';
import { deleteFavoriteBook, getFavoriteBook } from '../composables/favoriteBook.js';
import { useRouter } from 'vue-router'
import EditType from '../components/EditType.vue'
const { user, deleteData } = inject('user')
const theme = inject('theme')
const emits = defineEmits(['showlogin', 'userstatus', 'logout'])
const isUser = computed(() => user.value.type == 'user')

const posts = ref([])
const books = ref([])
const borrows = ref([])
const allBorrows = ref([])
const favorites = ref([])
const bookUpdateItem = ref({})
const isUpdateBook = ref(false)
const page = ref(12)

const router = useRouter()


const updateuser = async (userupdated) => {
    if (await userupdated === 'passnotmatch') {
        createNotification("warning", "Password not match!!", 2500)
    }
    else {
        createNotification("success", "Update Success ", 2500)
        console.log(await userupdated)
        user.value = await userupdated
    }
}

const deleteuser = async () => {
    createNotification("success", "Delete Success ", 2500)
    user.value = {}
}

const MapFavorite = () => {
    let favsMap = []
    favorites.value.forEach(fav => {
        favsMap.push({ id: fav.id, title: fav.book?.title, value: fav.book?.maincatagory })
    })
    return favsMap
}

const deleteFavoriteBookById = async (id) => {
    const status = await deleteFavoriteBook(id)
    if (status == 200) {
        favorites.value = favorites.value?.filter((fav) => {
            return fav.id !== id
        })
        createNotification("success", "This Book are Deleted in your Favorite List", 2500)
    } else {
        createNotification("Fail", "ลบ Fail.", 2500)

    }
}

const updateBrBookById = async (id) => {
    // borrows.value = await getBorrowBookById()  
    const status = await updateBorrowBook(id)
    if (status == 200) {
        borrows.value = borrows.value?.filter((br) => {
            return br.id != id
        })
        createNotification("success", "Return a book Successfully.", 2500)
    }
    else {
        createNotification("warning", "Cannot Return a book!", 2500)

    }

}

const createNewBook = async (newBook) => {
    let bookObj = books.value?.find(book => book.id === newBook.id)
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
        books.value = books.value.filter(book => book.id !== bookId)
        createNotification("success", "Delete Book" + bookId + " successfully.", 2500)
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
    if (noti.length > 0) {
        createNotification("warning", "Sorry, " + noti.join(",") + " can not empty.", 2500)
        return false
    }
    let status
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
    const post = posts.value.find(post => post.id === id);
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
    borrows.value = await getBorrowBook(await user.value?.id)
    allBorrows.value = await getAllBorrowBook()
    favorites.value = await getFavoriteBook(await user.value?.id)
})

const mapPosts = () => {
    let postsMap = []
    posts.value.forEach(post => {
        postsMap.push({ id: post.id, title: post.title, value: post.visible == 1 ? 'PUBLIC' : 'MEMBER' })
    })
    return postsMap
}

const MapAllBorrows = () => {
    let allBorrow = []
    allBorrows.value.forEach(i => {
        allBorrow.push({ id: i.id, title: i.book?.title, value: i.status == 1 ? 'อยู่ในระหว่างการยืม' : 'คืนแล้ว' })
    })
    return allBorrow
}

const gotoBook = (id) => {
    let book = favorites.value?.find((ids) => { return ids.id == id })
    if(book==undefined)  book = allBorrows.value?.find((ids) => { return ids.id == id })
    router.push({ name: 'onebook', params: { id: book?.bookId ?? ' ' } })
    if (book !== undefined) {
        router.push({ name: 'onebook', params: { id: book?.bookId ?? ' ' } })
    } else {
        router.push({ name: 'books' })
    }
}

const gotoRead = (id) => {
    const book = borrows.value?.find((ids) => { return ids.id == id })
    // router.push({ name: 'onebook', params: { id: book?.bookId ?? ' ' } })
    if (book !== undefined) {
        window.location=book.book.booklink
    } else {
        createNotification("success", "Ohh, Cannot read " + data.title + " now, try again later.", 2500)
    }
}

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

const isOpen = ref(true)
</script>
 
<template :class="theme.bgbase">
    <div class="fixed w-96 right-5 left-auto z-50 mt-24">
        <div class="flex-col min-h-24 rounded-2xl bg-opacity-70 border-2 mt-5 z-20" :class="notification.theme"
            v-for="notification in notifications">
            <div class="text-xl font-extrabold mx-5 mt-2 pt-2 ">{{ notification.type }}</div>
            <hr class="mx-5 mt-2 opacity-20">
            <div class="text-lg pl-5 mb-2 pr-2">{{ notification.message }}</div>
        </div>
    </div>
    <div class="w-screen h-screen flex justify-center items-center" v-if="(user?.id == undefined)">
        <div class="text-3xl font-bold text-center w-fit h-fit px-24 py-8 rounded-lg" :class="theme.text, theme.bgblock">
            Plese Log In First !!!
        </div>
    </div>
    <div class="w-full h-full min-h-screen pt-20 flex  " v-if="!(user?.id == undefined)">
        <div class="p-2 w-full text-center mt-0 mr-4 ml-auto text-2xl rounded-md absolute md:hidden cursor-pointer"
            :class="theme.profilebutton" @click="isOpen = true">
            OPEN SUB MENU
        </div>
        <div class="px-3 w-screen h-screen bg-opacity-70 fixed bg-blur pt-24 z-10" :class="theme.bgbase"
            v-if="isEditPost || isUpdateBook">
            <div class="w-full md:w-2/3 flex-col h-3/5 bg-opacity-90 justify-center mx-auto mt-auto mb-auto rounded-xl z-20  overflow-auto p-5"
                :class="theme.bgblock">
                <div class="flex justify-end -mb-20 cursor-pointer">
                    <div class="border-2 h-fit p-2 rounded-full z-10 cursor-pointer" :class="theme.text"
                        @click="() => { isEditPost = false, isUpdateBook = false }">ClOSE</div>
                </div>
                <CreateAndUpdatePost :post="postEditItem" :isUpdate="true" @createPost="editpost($event, true)"
                    v-if="isEditPost" />
                <CreateAndUpdateBook @createBook="updateBook" :book="bookUpdateItem" :isUpdate="true" v-if="isUpdateBook" />
            </div>
        </div>


        <div class="md:w-[25%] md:ml-24 w-full min-h-screen h-full bg-opacity-90 md:bg-opacity-40 absolute  md:contents z-10"
            :class="theme.bgblock, isOpen ? '' : 'hidden'">
            <div class="p-2 w-fit m-3 mr-4 ml-auto text-2xl rounded-md md:hidden cursor-pointer"
                :class="theme.profilebutton" @click="isOpen = false">
                CLOSE
            </div>
            <div class="md:flex flex-col md:pl-16 h-fit">
                <div class="pt-16 flex justify-center mx-12">
                    <img :src="user.image?.length>10 ?user?.image: '../default/profile.png'"
                        class="h-48 w-48 bg-gray-700 rounded-full border-2">
                </div>
                <div class="lg:text-2xl text-xl text-center mt-4 mb-4 uppercase" :class="theme.textheader">
                    {{ user?.name ?? 'Guest User' }}
                </div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser" @click="page = 21, isOpen = false">เพิ่มหนังสือใหม่</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="!isUser" @click="page = 22, isOpen = false">สร้างโพสต์ใหม่</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page = 11, isOpen = false">จัดการหนังสือทั้งหมด
                </div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page = 23, isOpen = false">จัดการโพสต์ทั้งหมด</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center  rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" v-if="!isUser" @click="page = 27, isOpen = false">รายการหนังสือที่ถูกยืม
                </div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 "
                    :class="theme.profilebutton" @click="page = 25, isOpen = false">หนังสือที่ชอบ</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" @click="page = 12, isOpen = false">การยืมของฉัน</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" @click="page = 24, isOpen = false">ประวัติการยืมของฉัน</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" v-if="user.type == 'admin'" @click="page = 90, isOpen = false">
                    อัพเดตสิทธิผู้ใช้</div>
                <div class="cursor-pointer lg:text-2xl text-xl text-center rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300"
                    :class="theme.profilebutton" @click="page = 13, isOpen = false">แก้ไขข้อมูลผู้ใช้</div>
                <div @click="deleteData(), isOpen = false, page = 12" 
                    class="cursor-pointer lg:text-2xl text-xl text-center  rounded-lg py-3 my-2 uppercase hover:bg-opacity-80 hover:-translate-y-1 ease-in-out duration-300 bg-red-600 text-white">
                    ออกจากระบบ
                </div>
            </div>
        </div>
        <div class="w-full min-h-screen h-full mt-6 md:mt-0 md:w-[75%] md:blur-none md:opacity-100"
            :class="isOpen ? 'blur opacity-30' : ''">
            <ItemLists v-show="page == 11" :items="books"
                :config="{ header: 'รายการหนังสือทั้งหมด', subname: 'หมวดหมู่', action1: 'แก้ไข', action2: 'ลบ ', subvalue: 'maincatagory' }"
                @event1="updateBookId" @event2="deleteBook" />
            <ItemLists v-show="page == 23" :items="mapPosts()"
                :config="{ header: 'รายการโพสต์ทั้งหมด', subname: 'Status', action1: 'แก้ไข', action2: 'ลบ ', subvalue: 'value' }"
                @event1="editPostById" @event2="deletePost" />
            <HistoryBorrow v-show="page == 24" />
            <ItemLists v-show="page == 25" :items="MapFavorite()"
                :config="{ header: 'หนังสือที่ชอบของ ' + user.name, subname: 'หมวดหมู่', action1: 'เลิกชอบ', action2: 'รายละเอียด', subvalue: 'value' }"
                @event1="deleteFavoriteBookById" @event2="gotoBook" />
            <CreateAndUpdateBook v-if="page == 21" @createBook="createNewBook" />
            <CreateAndUpdatePost v-if="page == 22" :isUpdate="false" @createPost="editpost" />
            <ItemLists v-show="page == 27" :items="MapAllBorrows()"
                :config="{ header: 'รายการการยืมทั้งหมด', subname: 'สถานะการยืม', action1: '', action2: 'รายละเอียดหนังสือ', subvalue: 'value' }"
                @event1="updateBrBookById" @event2="gotoBook" />

            <BorrowBookList v-if="page == 12" @updateBorrowBook="updateBrBookById" @gotoRead="gotoRead" :borrows="borrows" />
            <Edituser v-if="page == 13" @updateuser="updateuser" @deleteuser="deleteuser" />
            <EditType v-if="page == 90 && user.type === 'admin'" />
        </div>
    </div>
</template>
 
<style scoped></style>