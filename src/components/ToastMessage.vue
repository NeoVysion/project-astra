<script setup>
import { computed, reactive } from "vue";
import useErrorStore from "@/stores/errors";
import { isObject } from "ramda-adjunct";

const initialState = Object.freeze({
  title: "",
  description: "",
  type: "",
  visible: false
});
const message = reactive({
  title: "",
  description: "",
  type: "",
  visible: false
});

const backgroundColor = computed(() => {
  switch (message.type) {
    case "warning":
      return "rgba(251, 216, 114, 0.8)";
    case "success":
      return "rgba(180, 210, 140, 0.8)";
    case "error":
    default:
      return "#ffccc7";
  }
});

const messageStore = useErrorStore();
messageStore.$subscribe(
  (mutation, { title, message: msg, type, show }) => {
    message.title = title;
    if (isObject(msg)) {
      message.description = `<strong>Code: ${msg.errorCode}:</strong> ${msg.errorDescription}`;
    } else {
      message.description = msg;
    }
    message.type = type;
    message.visible = show;

    // Reset error message after 7s
    setTimeout(() => {
      message.title = initialState.title;
      message.description = initialState.description;
      message.type = initialState.type;
      message.visible = initialState.visible;
    }, 7000);
  },
  { detached: true }
);

const handleClose = () => {
  message.visible = false;
  messageStore.$reset();
};
</script>

<template>
  <a-alert
    v-if="message.visible"
    :message="message.title"
    :type="message.type"
    show-icon
    closable
    banner
    :after-close="handleClose"
    :style="{ backgroundColor }"
  >
    <template #description>
      <span v-html="message.description" />
    </template>
  </a-alert>
</template>

<style scoped>
.ant-alert {
  position: fixed;
  margin-top: 1em;
  width: 80%;
  z-index: 1001;
  background-color: #ffccc7;
}
</style>
