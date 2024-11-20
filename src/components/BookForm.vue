<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="MaSach">Mã sách</label>
            <Field name="MaSach" type="text" class="form-control"
                v-model="bookLocal.MaSach" />
            <ErrorMessage name="MaSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenSach">Tên sách</label>
            <Field name="TenSach" type="text" class="form-control"
                v-model="bookLocal.TenSach" />
            <ErrorMessage name="TenSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DonGia">Đơn giá</label>
            <Field name="DonGia" type="number" class="form-control"
                v-model="bookLocal.DonGia" min="1000" />
            <ErrorMessage name="DonGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SoQuyen">Số quyển</label>
            <Field name="SoQuyen" type="number" class="form-control"
                v-model="bookLocal.SoQuyen" min="1" />
            <ErrorMessage name="SoQuyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NamXuatBan">Năm xuất bản</label>
            <Field name="NamXuatBan" type="number" class="form-control"
                v-model="bookLocal.NamXuatBan" min="1900" max="9999" />
            <ErrorMessage name="NamXuatBan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaNXB">Mã NXB</label>
            <Field name="MaNXB" type="text" class="form-control"
                v-model="bookLocal.MaNXB" />
            <ErrorMessage name="MaNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TacGia">Tác giả</label>
            <Field name="TacGia" type="text" class="form-control"
                v-model="bookLocal.TacGia" />
            <ErrorMessage name="TacGia" class="error-feedback" />
        </div>
        

        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input"
                v-model="bookLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Sách yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu thay đổi</button>
            <button v-if="bookLocal.MaSach" type="button"
                class="ml-2 btn btn-danger" @click="deleteBook">Xóa</button>
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
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            MaSach: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^BS\d+$/, "Mã phải bắt đầu bằng 'BS' và theo sau là các chữ số."),
            TenSach: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(1, "Tên phải ít nhất 1 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            DonGia: yup
                .number()
                .required("Đơn giá phải có giá trị.")
                .integer("Đơn giá phải là số nguyên.")
                .min(1000, "Đơn giá phải tối thiểu là 1000."),
            SoQuyen: yup
                .number()
                .required("Số quyển phải có giá trị.")
                .integer("Số quyển phải là số nguyên.")
                .min(1, "Số quyển phải lớn hơn 0."),
            NamXuatBan: yup
                .number()
                .required("Năm xuất bản phải có giá trị.")
                .integer("Năm xuất bản phải là số nguyên.")
                .min(1900, "Năm xuất bản phải lớn hơn hoặc bằng 1900.")
                .max(new Date().getFullYear(), "Năm xuất bản không thể lớn hơn năm hiện tại."),
            MaNXB: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^NXB\d+$/, "Mã phải bắt đầu bằng 'NXB' và theo sau là các chữ số."),
            TacGia: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(1, "Tên phải ít nhất 1 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.masach);
        },
        Cancel(){
            const reply = window
                .confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            }
            else this.$router.push({ name: "book" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>