<script setup>
import { InfoCircleFilled } from "@ant-design/icons-vue";

const props = defineProps({
  message: { type: String }
});
</script>

<template>
  <a-popover :content="message">
    <InfoCircleFilled class="popover-icon" />
  </a-popover>
</template>

<style scoped>
.anticon.anticon-info-circle.popover-icon {
  vertical-align: sub;
}
</style>
