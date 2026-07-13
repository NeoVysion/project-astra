<script setup>
import { watch, ref, onBeforeMount } from "vue";
import columns from "@/utils/formatColumns";
import ActionColumn from "./ActionColumn.vue";
import {
  SearchOutlined,
  CalendarOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons-vue";
import AutocompleteFilter from "./table-filter/AutocompleteFilter.vue";
import DatepickerFilter from "./table-filter/DatepickerFilter.vue";
import NumberFilter from "./table-filter/NumberFilter.vue";
import InputFilter from "./table-filter/InputFilter.vue";
import SelectFilter from "./table-filter/SelectFilter.vue";
import RadioFilter from "./table-filter/RadioFilter.vue";
import CheckboxFilter from "./table-filter/CheckboxFilter.vue";
import DaterangeFilter from "./table-filter/DaterangeFilter.vue";

const props = defineProps({
  layout: { type: Object },
  data: { type: Array },
  loading: { type: Boolean },
  reload: { type: Boolean },
  selectedRows: { type: Array },
  initialSelectedRows: { type: Array },
});

const pagination = ref({ enable: false });

const addIndexToData = (data) =>
  data.map((d, index) => {
    d.key = index;
    return d;
  });

const formattedData = ref(addIndexToData(props.data || []));
const formattedColumns = ref([]);

// Configurazione dell'expandable
const expandableConfig = props.layout.expandable || { enable: false };

onBeforeMount(async () => {
  formattedColumns.value = await columns(props.layout);
});

const addClassToRow = (record, index) => {
  return index % 2 === 1 ? "table-striped" : null;
};

watch(
  () => props.data,
  (d) => {
    formattedData.value = addIndexToData(d);
  },
);
</script>

<template>
  <a-table
    ref="tRef"
    class="table tim-table"
    size="small"
    :columns="formattedColumns"
    :pagination="
      props.layout.pagination && props.layout.pagination.enable == true
        ? props.layout.pagination
        : false
    "
    :data-source="data"
    :loading="loading"
    :rowClassName="addClassToRow"
    :row-expandable="expandableConfig.rowExpandable"
  >
    <template #bodyCell="col">
      <!--    Sub-component for manage actions column -->
      <template v-if="col.column && col.column.key == 'actions'">
        <ActionColumn :actions="layout.actions" :record="col.record" />
      </template>
      <!--    ----------------------------------------    -->

      <!--    Sub-component for manage custom render for data -->
      <template
        v-else-if="
          col.column &&
          (col.column.showIf === true || col.column.showIf(col.record))
        "
      >
        <component :is="col.column.renderComponent" :record="col"></component>
      </template>
      <!--    ----------------------------------------    -->

      <template v-else>
        <span />
      </template>
    </template>

    <!--    Sub-component for manage custom expandable row -->
    <template #expandedRowRender="{ record }" v-if="expandableConfig.enable">
      <component :is="expandableConfig.expandedRowRender" :record="record" />
    </template>
    <!-- <template #expandColumnTitle v-if="expandableRows">
      <span style="color: var(--white)"><EllipsisOutlined /></span>
    </template> -->

    <!--    Sub-component for search icon filter -->
    <template #customFilterIcon>
      <SearchOutlined />
    </template>
    <!--    ----------------------------------------    -->

    <template #customFilterDropdown="cfd">
      <template v-if="cfd.column && cfd.column.filterType == 'input'">
        <InputFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'datepicker'">
        <DatepickerFilter
          :clear-filters="cfd.clearFilters"
          :confirm="cfd.confirm"
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'date-range'">
        <DaterangeFilter
          :clear-filters="cfd.clearFilters"
          :confirm="cfd.confirm"
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'radiobutton'">
        <RadioFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'autocomplete'">
        <AutocompleteFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'number'">
        <NumberFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'select'">
        <SelectFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>

      <template v-if="cfd.column && cfd.column.filterType == 'checkbox'">
        <CheckboxFilter
          :selected-keys="cfd.selectedKeys"
          :set-selected-keys="cfd.setSelectedKeys"
          :confirm="cfd.confirm"
          :clear-filters="cfd.clearFilters"
          :column="cfd.column"
        />
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="postcss">
.ant-table-wrapper.tim-table :deep(.table-striped) td {
  background-color: var(--pale-grey);
}

.ant-table-wrapper.tim-table :deep(.ant-table-tbody > tr:hover > td) {
  background-color: var(--hyper-pale-red);
}

.ant-table-wrapper.tim-table
  :deep(.ant-table-tbody .ant-checkbox-wrapper-disabled) {
  display: none;
}

#app .ant-table-wrapper.tim-table :deep(.ant-spin-dot-item) {
  background-color: var(--primary-red);
}

.input-btn,
.input-row {
  padding: 1em;
}

.table.tim-table :deep(.ant-table-filter-trigger) {
  font-size: 0.9em;
  padding: 5px 8px;
  transition: all ease 0.5s;
  color: var(--orange);

  &:hover {
    /* color: rgba(0, 0, 0, 0.45); */
    color: var(--light-orange);
    background: rgba(0, 0, 0, 0.06);
    box-shadow: inset white 0px 0px 10px 5px;
    transition: all ease 0.5s;
  }
}

.table.tim-table :deep(.ant-table-filter-trigger.active) {
  color: var(--dark-orange);
  background-color: var(--highlight-orange);
  border: 1px solid var(--dark-orange);
}

.table.tim-table :deep(.ant-dropdown-open) {
  /* color: rgba(0, 0, 0, 0.45); */
  color: var(--light-orange);
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset white 0px 0px 10px 5px;
}

.table.tim-table :deep(.ant-table-column-title .header-filter-info) {
  font-size: smaller;
  color: var(--light-orange);
  max-width: 100px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  margin-bottom: 1px;
}

.table.tim-table :deep(.ant-table-row .colList) {
  margin: 0;
}

.table.tim-table :deep(.ant-pagination-item),
.table.tim-table :deep(.ant-pagination-prev),
.table.tim-table :deep(.ant-pagination-next) {
  border-radius: 6px;
  min-width: 32px;
  /* font-family: Arial; */
  text-align: center;
  list-style: none;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:not(.ant-pagination-disabled):hover {
    background-color: white;
    border-color: var(--primary-red);
    transition: all 0.3s;

    &:deep(a) {
      color: var(--primary-red);
    }
  }

  &:not(.ant-pagination-disabled):deep(.ant-pagination-item-link):hover {
    background: #fff;

    .anticon {
      color: var(--primary-red);
    }
  }
}

.table.tim-table :deep(.ant-pagination-item-active) {
  font-weight: 500;
  min-width: 32px;
  font-family: Arial;
  text-align: center;
  list-style: none;
  background-color: #fff;
  border: 1px solid var(--primary-red);
  border-radius: 6px;
  outline: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.table.tim-table :deep(.ant-table-row-expand-icon) {
  margin-left: 6px;
  border: 1px solid var(--primary-grey);

  &:active,
  &:focus,
  &:hover {
    color: var(--primary-red);
  }
}
</style>
