<script setup>
defineProps({
  title: {
    type: String,
  },
  icon: {
    type: Function,
  },
  size: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <a-page-header class="tim-header">
    <template #avatar>
      <component :is="icon" :style="'font-size:' + size + 'px'" />
    </template>
    <template #title>
      <strong :style="'font-size:' + size + 'px'">{{ title }}</strong>
    </template>
    <template #tags> </template>
    <template #extra>
      <slot></slot>
    </template>
    <a-divider />
  </a-page-header>
</template>

<style lang="postcss">
.ant-divider-horizontal {
  margin: 0 0 20px 0;
}

.ant-page-header.tim-header {
  padding: 0;
}

.ant-page-header.tim-header .ant-page-header-heading-left svg {
  margin-right: 10px;
  color: var(--primary-red);
}

.ant-page-header.tim-header .ant-page-header-heading-title {
  color: var(--title-color);
  font-weight: bold;
}
</style>
