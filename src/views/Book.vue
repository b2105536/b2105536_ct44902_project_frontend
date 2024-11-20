<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục sách
                <i class="fas fa-book"></i>
            </h4>
            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sách nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-primary" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllBooks">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Thông tin chi tiết
                    <i class="fas fa-book-reader"></i>
                </h4>
                <BookDetail :book="activeBook" />
            </div>
        </div>
    </div>
</template>

<script>
import BookDetail from "@/components/BookDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookDetail,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = book;
                return [MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sách?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>