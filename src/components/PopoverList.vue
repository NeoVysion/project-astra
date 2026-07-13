<script setup>
import { ref } from "vue";

const props = defineProps({
  record: { type: Object },
  title: { type: String },
  mapName: { type: String },
  routeName: { type: String },
  paramName: { type: String },
});

const hasElements = ref(
  Object.keys(props.record.record[props.mapName]).length > 0
);
</script>

<template>
  <a-popover :title="title" v-if="hasElements">
    <template #content>
      <ul>
        <li v-for="(value, index) in record.record[mapName]" :key="index">
          <router-link
            :to="{
              name: routeName,
              params: { [paramName]: index },
            }"
          >
            {{ value }}
          </router-link>
        </li>
      </ul>
    </template>
    <a-badge
      :count="record.text"
      :number-style="{
        backgroundColor: '#b8ddfc',
        color: '#003264',
        boxShadow: '0 0 0 1px #003264 inset',
      }"
      class="number"
    />
  </a-popover>
  <span v-else class="zero-elem">{{ record.text }}</span>
</template>

<style scoped lang="postcss">
.number {
  cursor: pointer;
}

.zero-elem {
  color: var(--dark-grey);
}
</style>
