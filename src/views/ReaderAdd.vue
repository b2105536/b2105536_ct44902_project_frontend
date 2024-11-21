<template>
    <div class="page">
        <h4>Thêm Độc giả</h4>
        <ReaderForm :reader="newReader" @submit:reader="addReader" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ReaderForm from "@/components/ReaderForm.vue";
import ReaderService from "@/services/reader.service";
export default {
    components: {
        ReaderForm,
    },
    data() {
        return {
            message: "",
            newReader: {}
        };
    },
    methods: {
        async addReader(data) {
            try {
                await ReaderService.create(data);
                alert('Độc giả được thêm thành công.');
                this.$router.push({ name: "reader" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>