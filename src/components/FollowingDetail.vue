<script>
export default {
    props: {
        following: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã độc giả:</strong>
            {{ following.MaDocGia }}
        </div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ following.MaSach }}
        </div>
        <div class="p-1">
            <strong>Ngày mượn:</strong>
            {{ following.NgayMuon }}
        </div>
        <div class="p-1">
            <strong>Ngày trả:</strong>
            {{ following.NgayTra }}
        </div>
    </div>
</template>