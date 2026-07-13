<script setup>
import { ref, watch } from "vue";
import locale from "ant-design-vue/es/locale/it_IT";
import Header from "@/components/Header.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import UserMenu from "@/components/UserMenu.vue";
import Footer from "@/components/Footer.vue";
import useLogin from "@/stores/login";

const loginStore = useLogin();

loginStore.init();
</script>

<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      hashed: false,
      token: {
        colorPrimary: '#eb0028',
      },
    }"
  >
    <a-layout class="main-container">
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout-content>
        <a-row type="flex">
          <a-col flex="5" style="margin-right: 10px">
            <BreadCrumbs />
          </a-col>
          <a-col flex="1">
            <UserMenu v-hide-inlogin />
          </a-col>
        </a-row>
        <a-row justify="center" class="main-view">
          <a-col :span="24">
            <router-view v-slot="{ Component, route }" :key="$route.fullPath">
              <transition :name="route.meta.transition || 'fade'">
                <component :is="Component" />
              </transition>
            </router-view>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<style>
html body {
  font-family: "SAMARITAN";
  background-image: url("assets/images/machinebg_2.png");
  background-size: cover;
  display: flex;
  align-items: flex-start;
}

#app {
  font-family: "SAMARITAN";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 75%;
  margin: 0 auto;
  padding: 0;
  font-weight: normal;
}
</style>

<style scoped lang="postcss">
.main-container {
  min-height: 100vh;
  background-color: transparent;

  .main-view {
    margin-top: 2em;
  }
}

.ant-layout-header {
  color: white;
  background-color: transparent;
  margin: 1em 0 1em 0;
  border: 2px solid #bfbfbf;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 1px #5c5c5c;
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
  line-height: 41px;
}

.ant-layout-content {
  background-color: transparent;
  margin: 1em 0 1em 0;
}

.ant-layout-footer {
  color: white;
  background-color: transparent;
  border: 2px solid #bfbfbf;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 1px #5c5c5c;
  padding: 5px;
  margin: 1em 0 1em 0;
  font-size: small;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
