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
      <a-col flex="auto">
        <a-checkbox-group
          ref="searchCheckbox"
          :placeholder="`Cerca ${column.label}`"
          :value="selectedKeys[0]"
          style="margin-bottom: 10px; display: block"
          @change="(value) => setSelectedKeys(value ? [value] : [])"
          @pressEnter="confirm"
        >
          <a-row type="flex">
            <a-col
              v-for="filter in column.filters"
              :key="filter.value"
              flex="1 1 50%"
            >
              <a-checkbox :value="filter.value">
                {{ filter.text }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
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
