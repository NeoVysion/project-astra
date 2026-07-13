<script setup>
import { MoreOutlined } from "@ant-design/icons-vue";
import SecretField from "./SecretField.vue";

const props = defineProps({
  items: { type: Array },
  type: { type: String }
});
</script>

<template>
  <div>
    <a-collapse
      v-for="i in items"
      :key="i.mainField"
      class="tim-collapse"
      accordion
      :bordered="false"
      expand-icon-position="end"
    >
      <a-collapse-panel
        v-if="i.details.length > 0"
        :key="i.mainField"
        :header="i.mainField"
      >
        <ul v-if="!type || type == 'list'" style="list-style-type: none">
          <li v-for="d in i.details" :key="d.key">
            <b v-if="d.needLabel">{{ d.key }}: </b>
            <SecretField
              v-if="d.value && d.needSecret"
              :real-value="d.value"
              :in-line="true"
            />
            <span v-else-if="d.isArray">
              <ul v-if="d.value.length > 0" style="list-style-type: none">
                <li v-for="val in d.value" :key="val">{{ val }}</li>
              </ul>
              <span v-else>N/A</span>
            </span>
            <span v-else>{{ d.value || "N/A" }}</span>
          </li>
        </ul>
        <a-descriptions
          v-if="type == 'description'"
          bordered
          :column="1"
          size="middle"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          <a-descriptions-item
            v-for="d in i.details"
            :key="d.key"
            :label="d.key"
          >
            {{ d.value }}
          </a-descriptions-item>
        </a-descriptions>
        <template #extra><MoreOutlined /></template>
      </a-collapse-panel>

      <div class="ant-collapse-item" v-else>
        <div class="ant-collapse-header">{{ i.mainField }}</div>
      </div>
    </a-collapse>
  </div>
</template>

<style scoped lang="postcss">
.tim-collapse {
  background-color: transparent;

  > .ant-collapse-item {
    border: 0;

    :deep(.ant-collapse-content-box) {
      padding: 0;

      :deep(ul > li > span > ul) {
        display: inline-block;
        padding: 0;
        margin-left: 15px;
      }
    }
  }
}

.anticon,
.ant-collapse
  > .ant-collapse-item
  > .ant-collapse-header
  > .ant-collapse-arrow {
  color: var(--primary-red);
  font-size: larger;
}
</style>
