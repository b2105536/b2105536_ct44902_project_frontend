<template>
    <div v-if="following" class="page">
        <h4>Hiệu chỉnh Thông tin mượn sách</h4>
        <FollowingForm :following="following" @submit:following="updateFollowing"
            @delete:following="deleteFollowing" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import FollowingForm from "@/components/FollowingForm.vue";
import FollowingService from "@/services/following.service";

export default {
    components: {
        FollowingForm,
    },
    props: {
        identifier: { type: String, required: true },
    },
    data() {
        return {
            following: null,
            message: "",
        };
    },
    methods: {
        async getFollowing(identifier) {
            try {
                this.following = await FollowingService.get(identifier);
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

        async updateFollowing(data) {
            try {
                await FollowingService.update(this.following.Identifier, data);
                alert('Thông tin mượn sách được cập nhật thành công.');
                this.$router.push({ name: "following" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteFollowing() {
            if (confirm("Bạn muốn xóa Thông tin mượn sách này?")) {
                try {
                    await FollowingService.delete(this.following.Identifier);
                    this.$router.push({ name: "following" });
                } catch (error) {
                console.log(error);
                }
            }
        },
    },
    created() {
        this.getFollowing(this.$route.params.identifier);
        this.message = "";
    },
};
</script>