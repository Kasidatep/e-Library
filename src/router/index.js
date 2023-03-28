import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue';
import AllPost from '../views/AllPost.vue';
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import OnePost from '../views/OnePost.vue'
import OneBook from '../views/OneBook.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "default",
      component: BookList,
    },
    {
      path: "/books",
      name: "books",
      component: BookList,
    },
    {
      path: "/posts",
      name: "posts",
      component: AllPost,
    },
    {
      path: "/books/:id",
      name: "onebook",
      component: OneBook,
    },
    {
        path: "/posts/:id",
        name: "onepost",
        component: OnePost,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: Profile,
    },
    {
      path: "/:notfoundpath(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});
export default router