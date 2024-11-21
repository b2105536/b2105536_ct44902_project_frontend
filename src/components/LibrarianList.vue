<script>
export default {
    props: {
        librarians: { type: Array, default: [] },
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
                v-for="(librarian, index) in librarians"
                :key="librarian.MSNV"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ librarian.HoTenNV }}
        </li>
    </ul>
</template>