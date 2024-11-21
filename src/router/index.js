import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import Publisher from "@/views/Publisher.vue";

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
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;