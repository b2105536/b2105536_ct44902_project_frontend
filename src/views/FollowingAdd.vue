<template>
    <div class="page">
        <h4>Thêm Theo dõi mượn sách</h4>
        <FollowingForm :following="newFollowing" @submit:following="addFollowing" />
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
    data() {
        return {
            message: "",
            newFollowing: {}
        };
    },
    methods: {
        async addFollowing(data) {
            try {
                await FollowingService.create(data);
                alert('Theo dõi mượn sách được thêm thành công.');
                this.$router.push({ name: "following" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>