<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Thông tin sách</h4>
        <BookForm :book="book" @submit:book="updateBook"
            @delete:book="deleteBook" />
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
    props: {
        masach: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(masach) {
            try {
                this.book = await BookService.get(masach);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateBook(data) {
            try {
                await BookService.update(this.book.MaSach, data);
                alert('Sách được cập nhật thành công.');
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteBook() {
            if (confirm("Bạn muốn xóa Sách này?")) {
                try {
                    await BookService.delete(this.book.MaSach);
                    this.$router.push({ name: "book" });
                } catch (error) {
                console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.$route.params.masach);
        this.message = "";
    },
};
</script>