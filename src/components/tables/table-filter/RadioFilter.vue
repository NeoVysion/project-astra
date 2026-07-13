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
        <a-radio-group
          ref="searchRadio"
          :placeholder="`Cerca ${column.label}`"
          :value="selectedKeys[0]"
          style="margin-bottom: 10px; display: block; min-width: 215px"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="confirm"
        >
          <a-row class="center">
            <a-col
              v-for="filter in column.filters"
              :key="filter.value"
              :span="12"
            >
              <a-radio
                :value="filter.value"
                :style="{
                  display: 'block',
                  height: '30px',
                  lineHeight: '30px'
                }"
              >
                {{ filter.text }}
              </a-radio>
            </a-col>
          </a-row>
        </a-radio-group>
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
