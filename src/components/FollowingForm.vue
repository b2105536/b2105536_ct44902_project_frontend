<template>
    <Form @submit="submitFollowing" :validation-schema="followingFormSchema">
        <div class="form-group">
            <label for="MaDocGia">Mã độc giả</label>
            <Field name="MaDocGia" type="text" class="form-control"
                v-model="followingLocal.MaDocGia" />
            <ErrorMessage name="MaDocGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaSach">Mã sách</label>
            <Field name="MaSach" type="text" class="form-control"
                v-model="followingLocal.MaSach" />
            <ErrorMessage name="MaSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgayMuon">Ngày mượn</label>
            <Field name="NgayMuon" type="text" class="form-control"
                v-model="followingLocal.NgayMuon" placeholder="yyyy-MM-dd" />
            <ErrorMessage name="NgayMuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgayTra">Ngày trả</label>
            <Field name="NgayTra" type="text" class="form-control"
                v-model="followingLocal.NgayTra" placeholder="yyyy-MM-dd" />
            <ErrorMessage name="NgayTra" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu thay đổi</button>
            <button v-if="followingLocal.MaSach" type="button"
                class="ml-2 btn btn-danger" @click="deleteFollowing">Xóa</button>
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
    emits: ["submit:following", "delete:following"],
    props: {
        following: { type: Object, required: true }
    },
    data() {
        const followingFormSchema = yup.object().shape({
            MaDocGia: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^DG\d+$/, "Mã phải bắt đầu bằng 'DG' và theo sau là các chữ số."),
            MaSach: yup
                .string()
                .required("Mã phải có giá trị.")
                .matches(/^BS\d+$/, "Mã phải bắt đầu bằng 'BS' và theo sau là các chữ số."),
            NgayMuon: yup
                .string()
                .required("Ngày mượn phải có giá trị.")
                .test(
                    "is-valid-date",
                    "Ngày mượn phải là ngày hợp lệ (định dạng yyyy-MM-dd).",
                    (value) => {
                        if (!value) return false;
                        const date = new Date(value);
                        return !isNaN(date.getTime());
                    }
                ),
            NgayTra: yup
                .string()
                .required("Ngày trả phải có giá trị.")
                .test(
                    "is-valid-date",
                    "Ngày trả phải là ngày hợp lệ (định dạng yyyy-MM-dd).",
                    (value) => {
                        if (!value) return false;
                        const date = new Date(value);
                        return !isNaN(date.getTime());
                    }
                )
                .test(
                    "is-after-ngaymuon",
                    "Ngày trả phải sau hoặc bằng ngày mượn.",
                    function (value) {
                        if (!value) return false;
                        const ngayTra = new Date(value);
                        const ngayMuon = new Date(this.parent.NgayMuon);
                        return ngayTra >= ngayMuon;
                    }
                ),
        });
        return {
            followingLocal: this.following,
            followingFormSchema,
        };
    },
    methods: {
        submitFollowing() {
            this.$emit("submit:following", this.followingLocal);
        },
        deleteFollowing() {
            this.$emit("delete:following", this.followingLocal.masach);
        },
        Cancel(){
            const reply = window
                .confirm('You have unsaved changes! Do you want to leave?')
            if (!reply) {
                return false
            }
            else this.$router.push({ name: "following" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>