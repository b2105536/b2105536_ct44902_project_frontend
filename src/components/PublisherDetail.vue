<script>
export default {
    props: {
        publisher: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã NXB:</strong>
            {{ publisher.MaNXB }}
        </div>
        <div class="p-1">
            <strong>Tên NXB:</strong>
            {{ publisher.TenNXB }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ publisher.DiaChi }}
        </div>
    </div>
</template>