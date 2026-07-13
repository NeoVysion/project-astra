<script setup>
import { ref } from "vue";

const props = defineProps({
  record: { type: Object },
  title: { type: String },
  elements: { type: Array }
});

const hasElements = ref(props.elements.length > 0);
</script>

<template>
  <a-popover :title="title" v-if="hasElements">
    <template #content>
      <ul>
        <li v-for="elem in elements.slice(0, 10)" :key="elem">
          {{ elem }}
        </li>
        <li v-if="elements.length > 10">...</li>
      </ul>
    </template>
    <a-badge
      :count="elements.length"
      :number-style="{
        backgroundColor: '#b8ddfc',
        color: '#003264',
        boxShadow: '0 0 0 1px #003264 inset'
      }"
      class="number"
    />
  </a-popover>
  <span v-else class="zero-elem">{{ elements.length }}</span>
</template>

<style scoped lang="postcss">
.number {
  cursor: pointer;
}

.zero-elem {
  color: var(--dark-grey);
}
</style>
