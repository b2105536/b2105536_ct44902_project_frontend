<template>
    <Form @submit="submitLibrarian" :validation-schema="librarianFormSchema">
        <div class="form-group">
            <label for="MSNV">Mã số NV</label>
            <Field name="MSNV" type="text" class="form-control"
                v-model="librarianLocal.MSNV" />
            <ErrorMessage name="MSNV" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="HoTenNV">Họ tên NV</label>
            <Field name="HoTenNV" type="text" class="form-control"
                v-model="librarianLocal.HoTenNV" min="1" max="50" />
            <ErrorMessage name="HoTenNV" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Password">Password</label>
            <Field name="Password" type="text" class="form-control"
                v-model="librarianLocal.Password" min="8" />
            <ErrorMessage name="Password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Chucvu">Chức vụ</label>
            <Field name="Chucvu" type="text" class="form-control"
                v-model="librarianLocal.Chucvu" />
            <ErrorMessage name="Chucvu" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Diachi">Địa chỉ</label>
            <Field name="Diachi" type="text" class="form-control"
                v-model="librarianLocal.Diachi" min="1" max="100" />
            <ErrorMessage name="Diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SoDienThoai">Số điện thoại</label>
            <Field name="SoDienThoai" type="text" class="form-control"
                v-model="librarianLocal.SoDienThoai" />
            <ErrorMessage name="SoDienThoai" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu thay đổi</button>
            <button v-if="librarianLocal.MSNV" type="button"
                class="ml-2 btn btn-danger" @click="deleteLibrarian">Xóa</button>
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
    emits: ["submit:librarian", "delete:librarian"],
    props: {
        librarian: { type: Object, required: true }
    },
    data() {
        const librarianFormSchema = yup.object().shape({
            MSNV: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^NV\d+$/, "Mã phải bắt đầu bằng 'NV' và theo sau là các chữ số."),
            HoTenNV: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(1, "Tên phải ít nhất 1 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            Password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(8, "Mật khẩu phải tối thiểu là 8."),
            Chucvu: yup
                .string()
                .required("Chức vụ phải có giá trị."),
            Diachi: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .min(1, "Địa chỉ phải ít nhất 1 ký tự.")
                .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
            SoDienThoai: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số '0' và có đúng 10 chữ số."),
        });
        return {
            librarianLocal: this.librarian,
            librarianFormSchema,
        };
    },
    methods: {
        submitLibrarian() {
            this.$emit("submit:librarian", this.librarianLocal);
        },
        deleteLibrarian() {
            this.$emit("delete:librarian", this.librarianLocal.msnv);
        },
        Cancel(){
            const reply = window
                .confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            }
            else this.$router.push({ name: "librarian" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>