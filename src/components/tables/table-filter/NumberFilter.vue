<script setup>
import { reactive } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  column: { type: Object },
  selectedKeys: { type: Array },
  setSelectedKeys: { type: Function },
  confirm: { type: Function },
  clearFilters: { type: Function }
});

const formState = reactive({
  condition: "",
  number: ""
});

const search = () => {
  props.setSelectedKeys([`${formState.condition}${formState.number}`]);
  props.confirm();
};
</script>

<template>
  <div class="tim-table-filter-wrapper">
    <a-row type="flex" justify="center" align="middle">
      <a-col span="24">
        <a-radio-group
          v-model:value="formState.condition"
          style="margin-bottom: 10px"
        >
          <a-radio-button value="<">&lt;</a-radio-button>
          <a-radio-button value=">">&gt;</a-radio-button>
          <a-radio-button value="=">=</a-radio-button>
        </a-radio-group>
        <!-- </a-col> -->
        <!-- <a-col span="10"> -->
        <a-input-number
          v-model:value="formState.number"
          style="margin-bottom: 10px"
        />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" align="middle">
      <a-col span="10" offset="2">
        <a-button
          type="primary"
          size="small"
          class="tim-btn"
          @click="search({ confirm: true, closeDropdown: true })"
        >
          <template #icon><SearchOutlined /></template>
          Cerca
        </a-button>
      </a-col>
      <a-col span="10">
        <a-button
          size="small"
          class="tim-btn"
          @click="clearFilters({ confirm: true, closeDropdown: true })"
        >
          Reset
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
