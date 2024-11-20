import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";

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
        path: "/book/:masach",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;