<script setup>
import { ref } from "vue";

const props = defineProps({
  record: { type: Object },
});

const allGilded = ref(props.record.record?.ALL_GILDED == 1 || 0);
const bgColor = ref(
  allGilded.value == 1 ? "rgb(180, 242, 171)" : "rgb(249, 239, 157)",
);
const textColor = ref(allGilded.value ? "rgb(12, 159, 0)" : "rgb(220, 130, 0)");
</script>

<template>
  <a-popover title="" v-if="record.text > 0 || false">
    <template #content>
      <span v-if="!allGilded"><b> NON </b></span>
      Tutti i personaggi di questo membro risultano gildati.
    </template>
    <a-badge
      title=""
      :count="record.text"
      :number-style="{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: '0 0 0 1px ' + textColor + ' inset',
      }"
      class="number"
    />
  </a-popover>
  <div v-else>{{ record.text || 0 }}</div>
</template>

<style scoped lang="postcss">
.anticon {
  font-size: large;
  margin-right: 5px;

  &.anticon-field-number {
    color: var(--dark-grey);
  }
}

:is(body, #app) .ant-badge :deep(.ant-scroll-number-only) {
  display: inline-block;
}
</style>
