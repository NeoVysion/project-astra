<script setup>
import useLogin from "@/stores/login";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, h } from "vue";
import Member from "@/models/member";

const user = ref("");
const userLogin = useLogin();
const router = useRouter();
const activityInfo = reactive({
  idUser: userLogin.getUser.ID,
  username: userLogin.getUser.USERNAME,
  profile: Member.getProfileTags().find(
    (p) => p.value === userLogin.getProfile,
  ),
  totChars: userLogin.getUser.TOT_CHARS,
});

userLogin.$subscribe(() => {
  if (!userLogin.isAuthenticated) {
    user.value = "";
    activityInfo.idUser = undefined;
    activityInfo.username = undefined;
    activityInfo.profile = undefined;
    activityInfo.totChars = undefined;
    return;
  }

  user.value = userLogin.user.USERNAME;
  activityInfo.idUser = userLogin.user.ID;
  activityInfo.username = userLogin.user.USERNAME;
  activityInfo.profile = Member.getProfileTags().find(
    (p) => p.value === userLogin.getProfile,
  );
  activityInfo.totChars = userLogin.user.TOT_CHARS;
});

onMounted(() => {
  user.value = userLogin.user.USERNAME;
});

const handleMenuClick = async (e) => {
  switch (e.key) {
    case "1":
      await router.push({
        name: "UserDetail",
      });
      break;
    case "2":
      await userLogin.logout();
      await router.replace({ name: "Login" });
      break;
  }
};
</script>
<template>
  <div v-hide-inlogin class="user-menu-main-wrapper">
    <a-dropdown placement="bottom">
      <a class="user-menu-wrapper" @click.prevent>
        <div class="threat-prefix">
          <img src="@/assets/images/threat.png" />
          <span>///</span>
        </div>
        Benvenuto <span class="username red-shadow">{{ user }}</span>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item-group
            key="g1"
            style="border-bottom: 1px dashed var(--primary-grey)"
          >
            <div class="session-activity">
              <ul>
                <li>
                  <span class="activity-label">Username:</span>
                  {{ activityInfo.username }}
                </li>
                <li>
                  <span class="activity-label">Profilo:</span>
                  <div v-if="activityInfo.profile" class="profile-wrapper">
                    <img
                      class="profile-image"
                      :src="activityInfo.profile.img"
                    />

                    <a-tag
                      class="profile-tag"
                      :style="{
                        color: activityInfo.profile.color,
                        borderColor: activityInfo.profile.color,
                      }"
                    >
                      {{ activityInfo.profile.text }}
                    </a-tag>
                  </div>
                </li>
              </ul>
            </div>
          </a-menu-item-group>
          <a-menu-item key="1" :disabled="true" title="Coming Soon">
            <UserOutlined /> Dettaglio utente
          </a-menu-item>
          <a-menu-item key="2"> <LogoutOutlined /> Logout </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<style scoped lang="postcss">
.user-menu-main-wrapper {
  padding: 5px 5px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid lightgrey;
}
.user-menu-wrapper .anticon {
  margin-left: auto;
}

.user-menu-wrapper {
  display: flex;
  align-items: center;
  font-family: "SAMARITAN";
  color: white;
  vertical-align: middle;

  .threat-prefix {
    display: flex;
    align-items: center;
    font-size: 8px;
    margin-right: 5px;

    img {
      float: left;
      width: 12px;
      height: 12px;
      background-image: url(../img/threat.png);
      background-size: 100% 100%;
      margin: 4px 0px;
      animation: 1.2s ease-in-out 0s infinite normal none running poi-fading;
    }
  }

  .username {
    text-transform: uppercase;
    color: var(--primary-red);
    font-size: larger;
    margin-left: 5px;
  }
}

.ant-dropdown-menu {
  font-size: larger;
  border: 1px solid var(--grey);
  border-radius: 5%;

  :deep(.ant-dropdown-menu-title-content) {
    font-family: "SAMARITAN";
    background: rgba(0, 0, 0, 0.9);
    padding: 3px 5px;
  }

  :deep(.ant-dropdown-menu-item) {
    font-family: "SAMARITAN";
    color: white;
    padding: 0.5em;

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      background-color: var(--light-grey);
    }

    :deep(.anticon) {
      font-size: larger;
      margin-right: 8px;
      vertical-align: sub;
    }

    :deep(.anticon-user) {
      color: var(--dark-red);
    }

    :deep(.anticon-logout) {
      color: var(--dark-red);
    }
  }

  :deep(.ant-dropdown-menu-item-group-title) {
    display: none;
  }
}

.session-activity {
  margin-top: 10px;
  margin-bottom: 10px;

  ul {
    margin-bottom: 5px;
    list-style: none;
    padding: 0;
    color: white;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: small;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .activity-label {
    flex: 0 0 65px;
    text-align: right;
    margin-right: 5px;
    background-color: white;
    padding: 0 5px;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--dark-grey);
  }

  .profile-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .profile-image {
    width: 20px;
    height: 20px;
    object-fit: contain;
    display: block;
  }

  .profile-tag {
    margin: 0;
    background: transparent;
    border-radius: 0;
  }
}
</style>
