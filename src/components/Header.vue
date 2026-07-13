<script setup>
import useLogin from "@/stores/login";
import DynamicMenu from "@/components/DynamicMenu.vue";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const words = [" ", "What", "Are", "Your", "Commands", "?", " "];
const samMsg = ref("");
let writeTimeout = null;

function samaritanWrite(i) {
  if (i < words.length) {
    samMsg.value = words[i];
    writeTimeout = setTimeout(() => {
      samaritanWrite(i + 1);
    }, 500);
  } else {
    writeTimeout = setTimeout(() => {
      samaritanWrite(0);
    }, 5000);
  }
}

onMounted(() => {
  samaritanWrite(0);
});

onBeforeUnmount(() => {
  clearTimeout(writeTimeout);
});

const userLogin = useLogin();
const isLoggedIn = ref(userLogin.isAuthenticated);

watch(userLogin, (user) => {
  isLoggedIn.value = user.isAuthenticated;
});
</script>

<template>
  <nav>
    <a-row type="flex" align="middle">
      <a-col :span="4" class="brand-header">
        <div class="header-logo">
          <div class="poi-sam-upper">&nbsp;</div>
          <div class="poi-sam-lower"></div>
        </div>
        <div v-if="!isLoggedIn" class="header-text">{{ samMsg }}</div>
        <div v-else class="header-text-logged">A.S.T.R.A.</div>
      </a-col>
      <a-col :span="20" style="padding-right: 5px">
        <DynamicMenu v-hide-inlogin />
      </a-col>
    </a-row>
  </nav>
</template>

<style scoped lang="postcss">
.brand-header {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 16px;

  .header-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .poi-sam-upper {
      width: 22px;
      height: 3px;
      background-color: #fff;
      margin-bottom: 8px;
    }

    .poi-sam-lower {
      width: 30px;
      height: 30px;
      background-image: url("src/assets/images/samaritan-signal.png");
      background-size: contain;
      background-repeat: no-repeat;
      flex-shrink: 0;
      animation: poi-fading 1.2s infinite ease-in-out;
    }
  }

  .header-text {
    display: flex;
    align-items: center;
    color: #fff;
    font-family: "SAMARITAN";
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 2em;
    margin-left: 10px;
    height: 41px;
    text-decoration: underline;
  }

  .header-text-logged {
    display: flex;
    align-items: center;
    color: var(--primary-red);
    font-family: "SAMARITAN";
    font-size: 2em;
    height: 41px;
  }
}

.env-header {
  text-align: end;

  .ant-tag {
    vertical-align: middle;
  }
}

.ant-dropdown-link {
  vertical-align: middle;
  text-align: center;
  padding: 6px 15px;
  border: 1px solid var(--primary-red);
  border-radius: 0.5em;
  transition: all ease 0.5s;
}

.ant-dropdown-link:hover {
  border-color: var(--light-red);
  color: var(--light-red);
  transition: all ease 0.5s;
}

.ant-dropdown-menu {
  font-size: larger;
  border: 1px solid var(--grey);
  border-radius: 5%;
  padding: 1em 0;
}

.ant-dropdown-menu:deep(.ant-dropdown-menu-item-group-title) {
  padding: 0;
  color: inherit;
}

.ant-dropdown-menu:deep(.ant-dropdown-menu-item-group-title) .anticon {
  font-size: large;
}

.ant-dropdown-menu:deep(.ant-dropdown-menu-item-group-title)
  .anticon.anticon-info-circle {
  color: var(--primary-blue);
  margin-left: -5px;
  margin-right: 8px;
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item) {
  padding: 1em;
  border-bottom: 1px solid var(--grey);
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):last-child {
  border-bottom: 0;
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):hover {
  background-color: var(--light-grey);
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):hover .anticon {
  font-size: large;
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):hover .anticon.anticon-user {
  color: var(--dark-red);
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):hover
  .anticon.anticon-close-circle {
  color: var(--dark-red);
}

.ant-fropdown-menu:deep(.ant-dropdown-menu-item):hover .anticon.anticon-logout {
  color: var(--light-aqua);
}
</style>
