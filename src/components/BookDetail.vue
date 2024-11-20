<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book.MaSach }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.TenSach }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ book.DonGia }}
        </div>
        <div class="p-1">
            <strong>Số quyển:</strong>
            {{ book.SoQuyen }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.NamXuatBan }}
        </div>
        <div class="p-1">
            <strong>Mã NXB:</strong>
            {{ book.MaNXB }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.TacGia }}
        </div>
        <div class="p-1">
            <strong>Sách yêu thích:&nbsp;</strong>
            <i v-if="book.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>