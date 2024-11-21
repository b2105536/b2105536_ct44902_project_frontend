<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục nhân viên
                <i class="fas fa-user"></i>
            </h4>
            <LibrarianList
                v-if="filteredLibrariansCount > 0"
                :librarians="filteredLibrarians"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhân viên nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-primary" @click="goToAddLibrarian">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllLibrarians">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeLibrarian">
                <h4>
                    Thông tin chi tiết
                    <i class="fas fa-user"></i>
                </h4>
                <LibrarianDetail :librarian="activeLibrarian" />
                <router-link
                    :to="{
                        name: 'librarian.edit',
                        params: { msnv: activeLibrarian.MSNV },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import LibrarianDetail from "@/components/LibrarianDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import LibrarianList from "@/components/LibrarianList.vue";
import LibrarianService from "@/services/librarian.service";

export default {
    components: {
        LibrarianDetail,
        InputSearch,
        LibrarianList,
    },
    data() {
        return {
            librarians: [],
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
        librarianStrings() {
            return this.librarians.map((librarian) => {
                const { MSNV, HoTenNV, Password, Chucvu, Diachi, SoDienThoai } = librarian;
                return [MSNV, HoTenNV, Password, Chucvu, Diachi, SoDienThoai].join("");
            });
        },
        filteredLibrarians() {
            if (!this.searchText) return this.librarians;
            return this.librarians.filter((_librarian, index) =>
                this.librarianStrings[index].includes(this.searchText)
            );
        },
        activeLibrarian() {
            if (this.activeIndex < 0) return null;
            return this.filteredLibrarians[this.activeIndex];
        },
        filteredLibrariansCount() {
            return this.filteredLibrarians.length;
        },
    },
    methods: {
        async retrieveLibrarians() {
            try {
                this.librarians = await LibrarianService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveLibrarians();
            this.activeIndex = -1;
        },

        async removeAllLibrarians() {
            if (confirm("Bạn muốn xóa tất cả Nhân viên?")) {
                try {
                    await LibrarianService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddLibrarian() {
            this.$router.push({ name: "librarian.add" });
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