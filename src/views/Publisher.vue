<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục nhà xuất bản
                <i class="fas fa-print"></i>
            </h4>
            <PublisherList
                v-if="filteredPublishersCount > 0"
                :publishers="filteredPublishers"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhà xuất bản nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-primary" @click="goToAddPublisher">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllPublishers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activePublisher">
                <h4>
                    Thông tin chi tiết
                    <i class="fas fa-file-alt"></i>
                </h4>
                <PublisherDetail :publisher="activePublisher" />
                <router-link
                    :to="{
                        name: 'publisher.edit',
                        params: { manxb: activePublisher.MaNXB },
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
import PublisherDetail from "@/components/PublisherDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";

export default {
    components: {
        PublisherDetail,
        InputSearch,
        PublisherList,
    },
    data() {
        return {
            publishers: [],
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
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { MaNXB, TenNXB, DiaChi } = publisher;
                return [MaNXB, TenNXB, DiaChi].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText)
            );
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },

        async removeAllPublishers() {
            if (confirm("Bạn muốn xóa tất cả Nhà xuất bản?")) {
                try {
                    await PublisherService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
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