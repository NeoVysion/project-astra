<script setup>
import Table from "./Table.vue";
import { ref, watch } from "vue";

const emits = defineEmits(["update:selectedRows"]);
const props = defineProps({
  label: { type: String },
  layout: { type: Object },
  data: { type: Array },
  selectedRows: { type: Array },
  reload: { type: Boolean },
  loading: { type: Boolean },
  initialSelectedRows: { type: Array }
});

const staticTableRef = ref();
const selectedRowsInternal = ref([]);

watch(selectedRowsInternal, (rows) => {
  emits("update:selectedRows", rows);
});
</script>

<template>
  <a-divider orientation="left" class="title" v-if="label">
    {{ label }}
  </a-divider>

  <div>
    <Table
      ref="staticTableRef"
      :layout="layout"
      :data="data"
      :loading="loading"
      v-model:selectedRows="selectedRowsInternal"
      :initialSelectedRows="initialSelectedRows"
    />
  </div>
</template>

<style scoped></style>
