<script setup>
import { FormOutlined, InfoCircleFilled } from "@ant-design/icons-vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  title: { type: String },
  disabled: { type: Boolean }
});
</script>

<template>
  <a-popover v-if="title">
    <template #content>
      <InfoCircleFilled class="popover-icon" />
      {{ title }}
    </template>
    <a-button
      class="action"
      @click="$emit('click')"
      size="large"
      :disabled="Boolean(disabled)"
    >
      <template #icon>
        <FormOutlined />
      </template>
      Modifica
    </a-button>
  </a-popover>
  <a-button
    v-else
    class="action"
    @click="$emit('click')"
    size="large"
    :disabled="Boolean(disabled)"
  >
    <template #icon>
      <FormOutlined />
    </template>
    Modifica
  </a-button>
</template>

<style scoped lang="postcss">
.ant-btn.action {
  @extend %ant-btn;

  .anticon.anticon-form {
    font-size: larger;
    color: var(--dark-orange);
  }
}
</style>
