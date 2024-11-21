import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import Publisher from "@/views/Publisher.vue";
import Librarian from "@/views/Librarian.vue";
import Reader from "@/views/Reader.vue";
import Following from "@/views/Following.vue";

const routes = [
    {
        path: "/book",
        name: "book",
        component: Book,
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/books/:masach",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true
    },

    {
        path: "/books/add",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },

    {
        path: "/publisher",
        name: "publisher",
        component: Publisher,
    },

    {
        path: "/publishers/:manxb",
        name: "publisher.edit",
        component: () => import("@/views/PublisherEdit.vue"),
        props: true
    },

    {
        path: "/publishers/add",
        name: "publisher.add",
        component: () => import("@/views/PublisherAdd.vue"),
    },

    {
        path: "/librarian",
        name: "librarian",
        component: Librarian,
    },

    {
        path: "/librarians/:msnv",
        name: "librarian.edit",
        component: () => import("@/views/LibrarianEdit.vue"),
        props: true
    },

    {
        path: "/librarians/add",
        name: "librarian.add",
        component: () => import("@/views/LibrarianAdd.vue"),
    },

    {
        path: "/reader",
        name: "reader",
        component: Reader,
    },

    {
        path: "/readers/:madocgia",
        name: "reader.edit",
        component: () => import("@/views/ReaderEdit.vue"),
        props: true
    },

    {
        path: "/readers/add",
        name: "reader.add",
        component: () => import("@/views/ReaderAdd.vue"),
    },

    {
        path: "/flg_records",
        name: "following",
        component: Following,
    },

    {
        path: "/flg_records/:identifier",
        name: "following.edit",
        component: () => import("@/views/FollowingEdit.vue"),
        props: true
    },

    
    {
        path: "/following/add",
        name: "following.add",
        component: () => import("@/views/FollowingAdd.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;