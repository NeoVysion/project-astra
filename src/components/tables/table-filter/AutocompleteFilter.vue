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

const options = ref([]);

const onAutoComplete = async (searchText) => {
  const result = await props.column.autocomplete(searchText);
  options.value = result || [];
};
</script>

<template>
  <div>
    <a-auto-complete
      ref="searchAutocomplete"
      :placeholder="`Search ${column.title}`"
      :value="selectedKeys[0]"
      :options="options"
      style="margin-bottom: 8px; display: block"
      @select="(value) => setSelectedKeys(value ? [value] : [])"
      @search="onAutoComplete"
    />
    <a-button
      type="primary"
      size="small"
      style="width: 90px; margin-right: 8px"
      @click="confirm({ confirm: true, closeDropdown: true })"
    >
      <template #icon><SearchOutlined /></template>
      Search
    </a-button>
    <a-button
      size="small"
      style="width: 90px"
      @click="clearFilters({ confirm: true, closeDropdown: true })"
    >
      Reset
    </a-button>
  </div>
</template>
