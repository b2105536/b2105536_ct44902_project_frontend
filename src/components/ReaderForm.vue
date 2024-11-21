<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <div class="form-group">
            <label for="MaDocGia">Mã độc giả</label>
            <Field name="MaDocGia" type="text" class="form-control"
                v-model="readerLocal.MaDocGia" />
            <ErrorMessage name="MaDocGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="HoLot">Họ lót</label>
            <Field name="HoLot" type="text" class="form-control"
                v-model="readerLocal.HoLot" min="1" max="50" />
            <ErrorMessage name="HoLot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Ten">Tên</label>
            <Field name="Ten" type="text" class="form-control"
                v-model="readerLocal.Ten" />
            <ErrorMessage name="Ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgaySinh">Ngày sinh</label>
            <Field name="NgaySinh" type="text" class="form-control"
                v-model="readerLocal.NgaySinh" />
            <ErrorMessage name="NgaySinh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Phai">Phái</label>
            <Field name="Phai" type="text" class="form-control"
                v-model="readerLocal.Phai" />
            <ErrorMessage name="Phai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control"
                v-model="readerLocal.DiaChi" max="100" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DienThoai">Số điện thoại</label>
            <Field name="DienThoai" type="text" class="form-control"
                v-model="readerLocal.DienThoai" />
            <ErrorMessage name="DienThoai" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu thay đổi</button>
            <button v-if="readerLocal.MaDocGia" type="button"
                class="ml-2 btn btn-danger" @click="deleteReader">Xóa</button>
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
    emits: ["submit:reader", "delete:reader"],
    props: {
        reader: { type: Object, required: true }
    },
    data() {
        const readerFormSchema = yup.object().shape({
            MaDocGia: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^DG\d+$/, "Mã phải bắt đầu bằng 'DG' và theo sau là các chữ số."),
            HoLot: yup
                .string()
                .required("Họ lót phải có giá trị."),
            Ten: yup
                .string()
                .required("Tên phải có giá trị."),
            NgaySinh: yup
                .string()
                .required("Ngày sinh phải có giá trị.")
                .test(
                    "is-valid-date",
                    "Ngày sinh phải là ngày hợp lệ (định dạng yyyy-MM-dd).",
                    (value) => {
                        if (!value) return false;
                        const date = new Date(value);
                        return !isNaN(date.getTime());
                    }
                ),
            Phai: yup
                .boolean()
                .required("Phải chọn phái (nam hoặc nữ).")
                .transform((value, originalValue) => {
                    if (originalValue.toLowerCase() === "nam") return true;
                    if (originalValue.toLowerCase() === "nữ") return false;
                    return value;
                })
                .typeError("Giá trị phải là 'nam' hoặc 'nữ'."),
            DiaChi: yup
                .string()
                .required("Địa chỉ phải có giá trị.")
                .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
            DienThoai: yup
                .string()
                .required("Số điện thoại phải có giá trị.")
                .matches(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số '0' và có đúng 10 chữ số."),
        });
        return {
            readerLocal: this.reader,
            readerFormSchema,
        };
    },
    methods: {
        submitReader() {
            this.$emit("submit:reader", this.readerLocal);
        },
        deleteReader() {
            this.$emit("delete:reader", this.readerLocal.madocgia);
        },
        Cancel(){
            const reply = window
                .confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            }
            else this.$router.push({ name: "reader" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>