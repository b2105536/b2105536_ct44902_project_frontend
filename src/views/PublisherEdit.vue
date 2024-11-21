<template>
    <div v-if="publisher" class="page">
        <h4>Hiệu chỉnh Thông tin nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher"
            @delete:publisher="deletePublisher" />
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
    props: {
        manxb: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(manxb) {
            try {
                this.publisher = await PublisherService.get(manxb);
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

        async updatePublisher(data) {
            try {
                await PublisherService.update(this.publisher.MaNXB, data);
                alert('Nhà xuất bản được cập nhật thành công.');
                this.$router.push({ name: "publisher" });
            } catch (error) {
                console.log(error);
            }
        },

        async deletePublisher() {
            if (confirm("Bạn muốn xóa Nhà xuất bản này?")) {
                try {
                    await PublisherService.delete(this.publisher.MaNXB);
                    this.$router.push({ name: "publisher" });
                } catch (error) {
                console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.$route.params.manxb);
        this.message = "";
    },
};
</script>