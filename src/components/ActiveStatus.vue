<script setup>
import { watch, ref } from "vue";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  active: { type: [Boolean, String, Number] },
  iconType: { type: String },
  align: { type: String },
  titles: { type: Object },
});

const srcIcon = ref();
const iconColor = ref();
const titleText = ref();
const boolActive = ref();

const setAttribute = () => {
  switch (props.iconType) {
    case "checks":
      break;
    default:
      boolActive.value = Boolean(props.active);
      srcIcon.value = boolActive.value ? CheckOutlined : CloseOutlined;
      iconColor.value = boolActive.value
        ? "rgb(72, 196, 0)"
        : "rgb(235, 0, 40)";
      break;
  }

  if (props.titles) {
    if (props.titles[props.active]) {
      titleText.value = props.titles[props.active];
    } else {
      titleText.value = props.active
        ? props.titles["TRUE"]
        : props.titles["FALSE"];
    }
  } else {
    titleText.value = props.active ? "Attivo" : "Non Attivo";
  }
};

watch(() => props.active, setAttribute);

setAttribute();
</script>

<template>
  <div :class="align">
    <component
      :is="srcIcon"
      v-if="typeof srcIcon !== 'string'"
      :title="titleText"
      :style="{ color: iconColor || 'inherit' }"
    />
    <img v-else :src="srcIcon" :title="titleText" />
  </div>
</template>

<style scoped>
.anticon {
  font-size: large;
  vertical-align: text-top;
}
</style>
