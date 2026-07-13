<script setup>
import { ref } from "vue";

const props = defineProps({
  record: { type: Object },
});

const characters = ref(
  props.record.characters.map((c) => ({
    name: c.name,
    color: c.in_guild ? "var(--pale-green)" : "var(--pale-red)",
  }))
);
</script>

<template>
  <a-card size="small" :bordered="false">
    <a-card-grid
      v-for="char in characters"
      :key="char.name"
      :style="'width: 20%; text-align: center; background-color: ' + char.color"
      :hoverable="false"
    >
      <span :style="'background-color: ' + char.color">{{ char.name }}</span>
    </a-card-grid>
  </a-card>
</template>

<style scoped lang="postcss">
.ant-card {
  box-shadow: none;
  background-color: transparent;
}
.ant-card .ant-card-grid {
  padding: 2px;
  font-size: 0.9em;
  box-shadow:
    1px 0 0 0 #fff,
    0 1px 0 0 #fff,
    1px 1px 0 0 #fff,
    1px 0 0 0 #fff inset,
    0 1px 0 0 #fff inset;
}
</style>
