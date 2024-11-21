<script>
export default {
    props: {
        flg_records: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item"
                v-for="(following, index) in flg_records"
                :key="following.Identifier"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ following.NgayMuon }}
        </li>
    </ul>
</template>