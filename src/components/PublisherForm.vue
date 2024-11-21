<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="MaNXB">Mã NXB</label>
            <Field name="MaNXB" type="text" class="form-control"
                v-model="publisherLocal.MaNXB" />
            <ErrorMessage name="MaNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenNXB">Tên NXB</label>
            <Field name="TenNXB" type="text" class="form-control"
                v-model="publisherLocal.TenNXB" min="1" max="50" />
            <ErrorMessage name="TenNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control"
                v-model="publisherLocal.DiaChi" min="1" max="100" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu thay đổi</button>
            <button v-if="publisherLocal.MaNXB" type="button"
                class="ml-2 btn btn-danger" @click="deletePublisher">Xóa</button>
            <button type="button" class="ml-2 btn btn-danger"
                @click="Cancel">Thoát</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            MaNXB: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^NXB\d+$/, "Mã phải bắt đầu bằng 'NXB' và theo sau là các chữ số."),
            TenNXB: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(1, "Tên phải ít nhất 1 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            DiaChi: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .min(1, "Địa chỉ phải ít nhất 1 ký tự.")
                .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
        });
        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.manxb);
        },
        Cancel(){
            const reply = window
                .confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            }
            else this.$router.push({ name: "publisher" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>