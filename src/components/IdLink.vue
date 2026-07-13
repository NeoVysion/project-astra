<script setup>
import { watch, ref } from "vue";
import { useSharedIds } from "@/commons/hooks/generic-hooks";

const props = defineProps({
  routeName: { type: String },
  paramName: { type: String },
  needIdClient: { type: Boolean },
  linkLabel: { type: String }
});

const to = ref();
const label = ref();

const { idClient } = useSharedIds();

const setAttribute = () => {
  to.value = {
    name: props.routeName,
    params: {}
  };
  to.value.params[props.paramName] = props.linkLabel;
  label.value = props.linkLabel;

  if (props.needIdClient) {
    to.value.params.id_client = idClient;
  }
};

watch(() => props.linkLabel, setAttribute);

setAttribute();
</script>

<template>
  <router-link :to="to"> {{ label }} </router-link>
</template>

<style scoped>
.anticon {
  font-size: larger;
}
</style>
