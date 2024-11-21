<template>
    <div class="page">
        <h4>Thêm Nhân viên</h4>
        <LibrarianForm :librarian="newLibrarian" @submit:librarian="addLibrarian" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import LibrarianForm from "@/components/LibrarianForm.vue";
import LibrarianService from "@/services/librarian.service";
export default {
    components: {
        LibrarianForm,
    },
    data() {
        return {
            message: "",
            newLibrarian: {}
        };
    },
    methods: {
        async addLibrarian(data) {
            try {
                await LibrarianService.create(data);
                alert('Nhân viên được thêm thành công.');
                this.$router.push({ name: "librarian" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>