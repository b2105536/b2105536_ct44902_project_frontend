<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục độc giả
                <i class="fas fa-user"></i>
            </h4>
            <ReaderList
                v-if="filteredReadersCount > 0"
                :readers="filteredReaders"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có độc giả nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-primary" @click="goToAddReader">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllReaders">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeReader">
                <h4>
                    Thông tin chi tiết
                    <i class="fas fa-user"></i>
                </h4>
                <ReaderDetail :reader="activeReader" />
                <router-link
                    :to="{
                        name: 'reader.edit',
                        params: { madocgia: activeReader.MaDocGia },
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
import ReaderDetail from "@/components/ReaderDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReaderList from "@/components/ReaderList.vue";
import ReaderService from "@/services/reader.service";

export default {
    components: {
        ReaderDetail,
        InputSearch,
        ReaderList,
    },
    data() {
        return {
            readers: [],
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
        readerStrings() {
            return this.readers.map((reader) => {
                const { MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = reader;
                return [MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) =>
                this.readerStrings[index].includes(this.searchText)
            );
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },
    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },

        async removeAllReaders() {
            if (confirm("Bạn muốn xóa tất cả Độc giả?")) {
                try {
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddReader() {
            this.$router.push({ name: "reader.add" });
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