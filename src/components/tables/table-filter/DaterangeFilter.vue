<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  column: { type: Object },
  selectedKeys: { type: Array },
  setSelectedKeys: { type: Function },
  confirm: { type: Function },
  clearFilters: { type: Function }
});

const disabledDate = (current) => current && current > Date.now();

const selectDate = (date) => {
  const range = {
    [props.column.startDate]: date[0].format(props.column.format),
    [props.column.endDate]: date[1].format(props.column.format)
  };

  props.setSelectedKeys([range, date]);
};
</script>

<template>
  <a-row class="input-row">
    <a-col>
      <a-range-picker
        :value="selectedKeys[1]"
        :disabled-date="disabledDate"
        :show-time="{
          hideDisabledOptions: true,
          format: 'HH:mm'
        }"
        format="YYYY-MM-DD HH:mm"
        @ok="selectDate"
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
