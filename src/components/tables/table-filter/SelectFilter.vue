<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  column: { type: Object },
  selectedKeys: { type: Array },
  setSelectedKeys: { type: Function },
  confirm: { type: Function },
  clearFilters: { type: Function }
});
</script>

<template>
  <div class="tim-table-filter-wrapper">
    <a-row type="flex" justify="center" align="middle">
      <a-col span="24">
        <a-select
          ref="searchDropdown"
          :placeholder="`Cerca ${column.label}`"
          :value="selectedKeys[0]"
          style="margin-bottom: 10px; display: block; min-width: 215px"
          @change="(value) => setSelectedKeys(value ? [value] : [])"
          @pressEnter="confirm"
        >
          <a-select-option
            v-for="filter in column.filters"
            :key="filter.value"
            :value="filter.value"
          >
            {{ filter.text }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" align="middle">
      <a-col span="10" offset="2">
        <a-button
          type="primary"
          size="small"
          class="tim-btn"
          @click="confirm({ confirm: true, closeDropdown: true })"
        >
          <template #icon><SearchOutlined /></template>
          Cerca
        </a-button>
      </a-col>
      <a-col span="10">
        <a-button
          class="tim-btn"
          size="small"
          @click="clearFilters({ confirm: true, closeDropdown: true })"
        >
          Reset
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
