<template>
    <div class="page">
        <h4>Thêm Nhà xuất bản</h4>
        <PublisherForm :publisher="newPublisher" @submit:publisher="addPublisher" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        PublisherForm,
    },
    data() {
        return {
            message: "",
            newPublisher: {}
        };
    },
    methods: {
        async addPublisher(data) {
            try {
                await PublisherService.create(data);
                alert('Nhà xuất bản được thêm thành công.');
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>