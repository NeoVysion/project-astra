<script setup>
import { LoadingOutlined, InfoCircleFilled } from "@ant-design/icons-vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  label: { type: String },
  size: { type: [String, Number] },
  img: { type: Function },
  imgColor: { type: String },
  btnLoading: { type: Boolean },
  title: { type: String },
  disabled: { type: Boolean },
});
</script>

<template>
  <a-popover v-if="title">
    <template #content>
      <InfoCircleFilled class="popover-icon" />
      {{ title }}
    </template>
    <a-button
      :size="size || 'default'"
      class="action"
      @click="$emit('click')"
      :disabled="Boolean(disabled)"
    >
      <template #icon>
        <component
          :is="LoadingOutlined"
          v-if="btnLoading"
          :style="{ color: 'rgb(235, 0, 40)' }"
          class="btn-icon"
        />
        <component
          :is="img"
          v-else-if="typeof img !== 'string'"
          :style="{ color: imgColor || 'inherit' }"
          class="btn-icon"
        />
        <img v-else :src="img" class="btn-img" />
      </template>
      <span style="vertical-align: middle">{{ label }}</span>
    </a-button>
  </a-popover>
  <a-button
    v-else
    :size="size || 'default'"
    class="action"
    @click="$emit('click')"
    :disabled="Boolean(disabled)"
  >
    <template #icon>
      <component
        :is="LoadingOutlined"
        v-if="btnLoading"
        :style="{ color: 'rgb(235, 0, 40)' }"
        class="btn-icon"
      />
      <component
        :is="img"
        v-else-if="typeof img !== 'string'"
        :style="{ color: imgColor || 'inherit' }"
        class="btn-icon"
      />
      <img v-else :src="img" class="btn-img" />
    </template>
    <span style="vertical-align: middle">{{ label }}</span>
  </a-button>
</template>

<style lang="postcss" scoped>
.ant-btn.action {
  @extend %ant-btn;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--light-grey);

  .anticon {
    line-height: 0;
    font-size: larger;
  }

  &:hover {
    border-bottom: 2px solid var(--dark-red);
    box-shadow: 0 0 8px 2px var(--highlight-grey);
  }
}
</style>
