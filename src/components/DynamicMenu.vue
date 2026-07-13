<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import useLogin from "@/stores/login";
import { CrownOutlined } from "@ant-design/icons-vue";

const selectedMenu = ref([]);
const router = useRouter();
const route = useRoute();
const loginStore = useLogin();

let normalRoutes = ref([]);
let adminRoutes = ref([]);

const loadRoutes = () => {
  const profile = loginStore.getProfile;

  normalRoutes.value = router.options.routes.filter(
    (f) =>
      f.meta?.onMenu &&
      (!f.meta?.requiresPlevel || f.meta?.requiresPlevel <= profile),
  );

  adminRoutes.value = router.options.routes.filter(
    (f) =>
      f.meta?.onAdminMenu &&
      (!f.meta?.requiresPlevel || f.meta?.requiresPlevel <= profile),
  );
};

watch(route, (currentRoute) => {
  selectedMenu.value = [currentRoute.name];
  loadRoutes();
});

loginStore.$subscribe(() => {
  loadRoutes();
});
</script>

<template>
  <a-menu mode="horizontal" class="astra-menu" :selectedKeys="selectedMenu">
    <a-menu-item v-for="item in normalRoutes" :key="item.name">
      <template #icon>
        <component :is="item.meta?.menuIcon" />
      </template>
      <router-link :to="{ name: item.name }">
        {{ item.meta.onMenu }}
      </router-link>
    </a-menu-item>

    <a-sub-menu index="admin-sub-menu">
      <template #icon>
        <CrownOutlined />
      </template>
      <template #title>
        <span>Amministrazione</span>
      </template>

      <a-menu-item
        v-for="item in adminRoutes"
        :key="item.name"
        :index="'admin-sub-menu' + item.name"
      >
        <template #icon>
          <component :is="item.meta?.menuIcon" />
        </template>
        <router-link :to="{ name: item.name }">{{
          item.meta.onAdminMenu
        }}</router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style scoped lang="postcss">
.ant-menu .ant-menu-item .ant-menu-item-icon,
.ant-menu .ant-menu-submenu .ant-menu-submenu-title .ant-menu-item-icon {
  font-size: larger;
}

.ant-menu :deep(.ant-menu-submenu) {
  float: right;
}
</style>
