<script setup>
import { HomeOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { find, path, propEq } from "ramda";
import useLogin from "@/stores/login";
import { isFunction } from "ramda-adjunct";

const breadcrumbs = ref([]);

const allRoutes = path(["options", "routes"], useRouter());
const currentRoute = useRoute();
const userLogin = useLogin();

function generateHierarchy(
  currentRoute,
  allRoutes,
  userProfile,
  aggregator = [],
) {
  if (
    !currentRoute.meta?.requiresPlevel ||
    currentRoute.meta?.requiresPlevel <= userProfile
  ) {
    aggregator.unshift(currentRoute);
  }

  if (currentRoute.meta?.parent) {
    const parent = isFunction(currentRoute.meta?.parent)
      ? currentRoute.meta?.parent()
      : currentRoute.meta?.parent;

    const findParent = allRoutes.find((r) => r.name == parent);
    if (findParent) {
      return generateHierarchy(findParent, allRoutes, userProfile, aggregator);
    }
  }

  return aggregator;
}

const setBreadcrumbs = () => {
  breadcrumbs.value = generateHierarchy(
    currentRoute,
    allRoutes,
    userLogin.getProfile,
  );
};

watch(currentRoute, setBreadcrumbs);

setBreadcrumbs();
</script>

<template>
  <a-breadcrumb
    :style="'visibility:' + (breadcrumbs.length > 1 ? 'visible' : 'hidden')"
  >
    <a-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.name"
    >
      <home-outlined v-if="index === 0" />
      <router-link
        :to="{ name: breadcrumb.name, params: currentRoute.params }"
        >{{
          breadcrumb.meta?.breadcrumbName
            ? breadcrumb.meta.breadcrumbName(breadcrumb)
            : breadcrumb.name
        }}</router-link
      >
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style scoped lang="postcss">
.anticon.anticon-home {
  font-size: larger;
}

.ant-breadcrumb a:hover,
.ant-breadcrumb a.router-link-active:hover {
  background-color: transparent;
  color: var(--primary-red);
}

.ant-breadcrumb a.router-link-active {
  color: black;
}
</style>
