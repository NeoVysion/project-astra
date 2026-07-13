<script setup>
import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  SearchOutlined,
  ToolOutlined,
  InfoCircleFilled,
  SyncOutlined,
  AimOutlined,
  WifiOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";

defineProps({
  actions: { type: Array },
  record: { type: Object },
});
</script>

<template>
  <div class="tim-action-container">
    <span
      v-for="action in actions.filter((act) =>
        act.showIf ? act.showIf(record) : true,
      )"
      :key="action"
      :class="
        action.type +
        ' ' +
        (action.disableIf && action.disableIf(record)
          ? 'tim-icon-action-disabled'
          : 'tim-icon-action')
      "
    >
      <a-popconfirm
        v-if="action.usePopconfirm"
        cancel-text="No"
        ok-text="Si"
        title="Sicuro di voler procedere?"
        @cancel="() => {}"
        @confirm="action.run(record)"
        :disabled="action.disableIf ? action.disableIf(record) : false"
      >
        <template #icon
          ><component :is="action.icon" style="color: red; font-size: initial"
        /></template>
        <a-popover v-if="action.title">
          <template #content>
            <InfoCircleFilled
              v-if="action.disableIf && action.disableIf(record)"
              class="popover-icon"
            />
            <span v-if="typeof action.title == 'function'">{{
              action.title(record)
            }}</span>
            <span v-else>{{ action.title }}</span>
          </template>
          <component :is="action.icon" />
        </a-popover>
        <component v-else :is="action.icon" />
      </a-popconfirm>
      <a-popover v-else-if="action.title">
        <template #content>
          <InfoCircleFilled
            v-if="action.disableIf && action.disableIf(record)"
            class="popover-icon"
          />
          <span v-if="typeof action.title == 'function'">{{
            action.title(record)
          }}</span>
          <span v-else>{{ action.title }}</span>
        </template>
        <component
          :is="action.icon"
          v-if="action.disableIf && action.disableIf(record)"
        />
        <component :is="action.icon" v-else @click="action.run(record)" />
      </a-popover>
      <component
        v-else-if="action.disableIf && action.disableIf(record)"
        :is="action.icon"
      />
      <component v-else :is="action.icon" @click="action.run(record)" />
    </span>
  </div>
</template>

<style lang="postcss" scoped>
.tim-action-container {
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  font-size: larger;

  .tim-icon-action {
    color: var(--primary-red);

    .anticon-search {
      color: var(--primary-blue);
    }

    .anticon-select {
      color: var(--primary-blue);
    }

    .anticon-eye,
    .anticon-wifi,
    .anticon-send {
      color: var(--dark-blue);
    }

    .anticon-delete {
      color: var(--dark-red);
    }

    .anticon-sync,
    .anticon-aim {
      color: var(--dark-red);
    }

    .anticon-form {
      color: var(--dark-orange);
    }

    .anticon-tool {
      color: var(--grey);
    }
  }

  .tim-icon-action-disabled {
    color: var(--shadow-grey);
    cursor: not-allowed;

    .anticon {
      cursor: not-allowed;
    }
  }
}
</style>
