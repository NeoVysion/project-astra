<script setup>
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  InfoCircleFilled
} from "@ant-design/icons-vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  label: { type: String },
  loading: { type: Boolean },
  title: { type: String },
  disabled: { type: Boolean }
});
</script>

<template>
  <a-popconfirm
    placement="right"
    ok-text="Si"
    cancel-text="No"
    @confirm="$emit('click')"
    :disabled="Boolean(disabled)"
  >
    <template #title> Sicuro di voler procedere all'eliminazione? </template>
    <template #icon>
      <QuestionCircleOutlined style="color: red" />
    </template>
    <a-popover v-if="title">
      <template #content>
        <InfoCircleFilled class="popover-icon" />
        {{ title }}
      </template>
      <a-button class="action" size="large" :disabled="Boolean(disabled)">
        <template #icon>
          <DeleteOutlined v-if="!loading" />
          <a-spin class="tim-red" v-else />
        </template>
        {{ label || "Rimuovi" }}
      </a-button>
    </a-popover>
    <a-button v-else class="action" size="large" :disabled="Boolean(disabled)">
      <template #icon>
        <DeleteOutlined v-if="!loading" />
        <a-spin class="tim-red" v-else />
      </template>
      {{ label || "Rimuovi" }}
    </a-button>
  </a-popconfirm>
</template>

<style scoped lang="postcss">
.ant-btn.action {
  @extend %ant-btn;

  .anticon.anticon-delete {
    font-size: larger;
    color: var(--dark-red);
  }
}

.popover-icon {
  color: var(--primary-blue);
  font-size: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
