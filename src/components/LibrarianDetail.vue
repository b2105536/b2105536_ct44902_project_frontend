<script>
export default {
    props: {
        librarian: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã số NV:</strong>
            {{ librarian.MSNV }}
        </div>
        <div class="p-1">
            <strong>Họ tên NV:</strong>
            {{ librarian.HoTenNV }}
        </div>
        <div class="p-1">
            <strong>Password:</strong>
            {{ librarian.Password }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ librarian.Chucvu }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ librarian.Diachi }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ librarian.SoDienThoai }}
        </div>
    </div>
</template>