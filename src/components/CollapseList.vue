<script setup>
import { ref } from "vue";
import { MoreOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  record: { type: Object }
});

console.log("SUBNETS: ", props.record.text);
const firstSubnet = ref(props.record.text[0]);
console.log("ARRAY: ", props.record.text);
const otherSubnets = ref(props.record.text.slice(1));

console.log("FIRST: ", firstSubnet.value);
console.log("OTHERS: ", otherSubnets.value);
</script>

<template>
  <a-collapse
    v-if="otherSubnets.length > 0"
    class="tim-collapse"
    accordion
    :bordered="false"
    expand-icon-position="end"
  >
    <a-collapse-panel :key="firstSubnet" :header="firstSubnet">
      <span v-for="sub in otherSubnets" :key="sub">{{ sub }}<br /></span>
      <template #extra><MoreOutlined /></template>
    </a-collapse-panel>
  </a-collapse>
  <span v-else style="padding: 10px 16px">{{ firstSubnet }}</span>
</template>

<style scoped lang="postcss">
.tim-collapse {
  background-color: transparent;

  > .ant-collapse-item {
    border: 0;
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
