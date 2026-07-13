<script setup>
import { computed } from "vue";
import { WarningOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  record: { type: Object }
});

const statusColor = computed(() => {
  let result = "gold";
  switch (props.record.record.status) {
    case "COMPLETED":
      result = "green";
      break;
    case "FAILED":
      result = "red";
      break;
    case "QUEUED":
      result = "gold";
      break;
    case "IN_PROGRESS":
      result = "blue";
      break;
  }

  return result;
});
</script>

<template>
  <div>
    <a-row :span="24">
      <a-col :span="20">
        <a-badge :color="statusColor" :text="record.text" />
      </a-col>

      <a-col :span="4">
        <a-popover v-if="record.text == 'FAILED'">
          <template #content>{{ record.record.desc_error }}</template>
          <WarningOutlined />
        </a-popover>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="postcss">
.anticon.anticon-warning {
  font-size: large;
  color: var(--orange);
  margin-right: 5px;
  margin-left: 5px;
}
</style>
