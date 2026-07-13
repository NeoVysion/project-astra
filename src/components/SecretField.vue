<script setup>
import { ref } from "vue";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  realValue: { type: String },
  inLine: { type: Boolean },
});

const visible = ref(false);
const printedValue = ref("**********");

const handleClick = () => {
  visible.value = !visible.value;
  printedValue.value = visible.value ? props.realValue : "**********";
};
</script>

<template>
  <div :style="inLine ? 'display: inline-block' : ''">
    <a-row
      v-if="realValue"
      :span="24"
      type="flex"
      justify="start"
      align="middle"
    >
      <a-col :span="22">
        {{ printedValue }}
      </a-col>
      <a-col :span="2">
        <EyeInvisibleOutlined v-if="visible" @click="handleClick" />
        <EyeOutlined v-else @click="handleClick" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="postcss">
.secret-val {
  display: inline-block;
  vertical-align: middle;
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
