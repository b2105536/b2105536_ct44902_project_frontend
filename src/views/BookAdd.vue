<template>
    <div class="page">
        <h4>Thêm Sách</h4>
        <BookForm :book="newBook" @submit:book="addBook" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookForm,
    },
    data() {
        return {
            message: "",
            newBook: {}
        };
    },
    methods: {
        async addBook(data) {
            try {
                await BookService.create(data);
                alert('Sách được thêm thành công.');
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>