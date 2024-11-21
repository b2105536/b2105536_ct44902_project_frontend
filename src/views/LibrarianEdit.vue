<template>
    <div v-if="librarian" class="page">
        <h4>Hiệu chỉnh Thông tin nhân viên</h4>
        <LibrarianForm :librarian="librarian" @submit:librarian="updateLibrarian"
            @delete:librarian="deleteLibrarian" />
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
    props: {
        msnv: { type: String, required: true },
    },
    data() {
        return {
            librarian: null,
            message: "",
        };
    },
    methods: {
        async getLibrarian(msnv) {
            try {
                this.librarian = await LibrarianService.get(msnv);
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

        async updateLibrarian(data) {
            try {
                await LibrarianService.update(this.librarian.MSNV, data);
                alert('Nhân viên được cập nhật thành công.');
                this.$router.push({ name: "librarian" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteLibrarian() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await LibrarianService.delete(this.librarian.MSNV);
                    this.$router.push({ name: "librarian" });
                } catch (error) {
                console.log(error);
                }
            }
        },
    },
    created() {
        this.getLibrarian(this.$route.params.msnv);
        this.message = "";
    },
};
</script>