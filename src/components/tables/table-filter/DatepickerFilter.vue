<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const props = defineProps({
  column: { type: Object },
  selectedKeys: { type: Array },
  setSelectedKeys: { type: Function },
  confirm: { type: Function },
  clearFilters: { type: Function }
});
const format = ref(props.column.format);
</script>

<template>
  <a-row class="input-row">
    <a-col>
      <a-date-picker
        :value="selectedKeys[1]"
        @change="(value) => setSelectedKeys([value.format(format), value])"
      />
    </a-col>
  </a-row>
  <a-row type="flex" justify="end" :gutter="[16, 32]" class="input-btn">
    <a-col>
      <a-button
        type="primary"
        size="small"
        @click="confirm({ confirm: true, closeDropdown: true })"
      >
        <template #icon><SearchOutlined /></template>
        Search
      </a-button>
    </a-col>
    <a-col>
      <a-button
        size="small"
        @click="clearFilters({ confirm: true, closeDropdown: true })"
      >
        Reset
      </a-button>
    </a-col>
  </a-row>
</template>

<style scoped></style>
