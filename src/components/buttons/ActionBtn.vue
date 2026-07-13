<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  label: { type: String },
  to: { type: String }
});

const router = useRouter();
const goTo = (routeName) => router.push({ name: routeName });
</script>

<template>
  <a-button class="action" @click="goTo(to)">
    {{ label }}
  </a-button>
</template>

<style lang="postcss" scoped>
.ant-btn.action {
  width: 200px;
  padding: 15px;
  font-weight: normal;
  height: 100%;
  border-radius: 0.5em;
  box-shadow: inset 0 0 10px 3px #bcb8b8;
  background-color: var(--light-grey);
  border-bottom: 2px solid #9d9b9b;

  &:hover,
  &:active,
  &:focus {
    border-color: var(--dark-grey);
    color: var(--primary-red);
    background-color: #e6e6e6;
  }
}
</style>
