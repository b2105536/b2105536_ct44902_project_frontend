<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục theo dõi mượn sách
                <i class="fas fa-book"></i>
            </h4>
            <FollowingList
                v-if="filteredFlg_recordsCount > 0"
                :flg_records="filteredFlg_records"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có theo dõi mượn sách nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-primary" @click="goToAddFollowing">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                
                <button class="btn btn-sm btn-danger" @click="removeAllFlg_records">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeFollowing">
                <h4>
                    Thông tin chi tiết
                    <i class="fas fa-book"></i>
                </h4>
                <FollowingDetail :following="activeFollowing" />
                <router-link
                    :to="{
                        name: 'following.edit',
                        params: { masach: activeFollowing.MaSach },
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
import FollowingDetail from "@/components/FollowingDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import FollowingList from "@/components/FollowingList.vue";
import FollowingService from "@/services/following.service";

export default {
    components: {
        FollowingDetail,
        InputSearch,
        FollowingList,
    },
    data() {
        return {
            flg_records: [],
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
        followingStrings() {
            return this.flg_records.map((following) => {
                const { MaDocGia, MaSach, NgayMuon, NgayTra } = following;
                return [MaDocGia, MaSach, NgayMuon, NgayTra].join("");
            });
        },
        filteredFlg_records() {
            if (!this.searchText) return this.flg_records;
            return this.flg_records.filter((_following, index) =>
                this.followingStrings[index].includes(this.searchText)
            );
        },
        activeFollowing() {
            if (this.activeIndex < 0) return null;
            return this.filteredFlg_records[this.activeIndex];
        },
        filteredFlg_recordsCount() {
            return this.filteredFlg_records.length;
        },
    },
    methods: {
        async retrieveFlg_records() {
            try {
                this.flg_records = await FollowingService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveFlg_records();
            this.activeIndex = -1;
        },

        async removeAllFlg_records() {
            if (confirm("Bạn muốn xóa tất cả Theo dõi mượn sách?")) {
                try {
                    await FollowingService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddFollowing() {
            this.$router.push({ name: "following.add" });
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