<script setup>
import PageHeader from "@/components/PageHeader.vue";
import {
  IdcardOutlined,
  MehOutlined,
  TagOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import Profile from "@/models/profile";
import Member from "@/models/member";
// import { useModal } from "@/commons/hooks/generic-hooks";
// import { useDeleteUser } from "@/commons/hooks/user-hooks";
// import ChangeBtn from "@/commons/components/buttons/ChangeBtn.vue";
// import DeleteBtn from "@/commons/components/buttons/DeleteBtn.vue";
import Table from "@/components/tables/Table.vue";
import SecretField from "@/components/SecretField.vue";
import ActiveStatus from "@/components/ActiveStatus.vue";
import { dateToString, decryptCredential } from "@/utils/tools";
// import ModalUpdateUser from "./modals/ModalUpdateUser.vue";
import { getById } from "@/db";

const route = useRoute();
// const idMember = ref(route.params.id_member);
// const disableDelete = ref(false);

const loading = ref(false);
const detailInfo = ref({});
const isAdmin = ref(false);
const charLayout = Member.getLayoutMemberCharacterList();

// Funzione per recuperare la lista degli users da Firestore
const fetchMemberDetail = async () => {
  try {
    loading.value = true;
    detailInfo.value = await getById("users", route.params.id_member);

    detailInfo.value.profile = Profile.getProfileTags().find(
      (p) => p.value === detailInfo.value.profile,
    );
    detailInfo.value.rawCredential = decryptCredential(
      detailInfo.value.credential,
    );
    detailInfo.value.creation_date = dateToString(
      detailInfo.value.creation_date,
    );
    detailInfo.value.update_date = dateToString(detailInfo.value.update_date);

    isAdmin.value = detailInfo.value.profile.value === "admin";

    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Errore durante il recupero dei dati del membro:", error);
  }
};

onBeforeMount(() => {
  fetchMemberDetail();
});

// const deleteUser = useDeleteUser(idUser.value, userInfo);

// const updateModal = useModal(loadUser);
// const updateModalVisible = ref(updateModal.modalVisible);
// const updateToggleModal = ref(updateModal.toggleModal);
</script>

<template>
  <div class="vpn-detail-container">
    <PageHeader :icon="IdcardOutlined" title="Dettaglio Membro" />

    <a-skeleton :loading="loading">
      <!-- <a-row :gutter="[16, 32]" class="primary-actions">
        <a-col>
          <ChangeBtn @click="updateToggleModal" />
        </a-col>
        <a-col v-if="isAdmin">
          <DeleteBtn
            @click="deleteUser"
            :disabled="disableDelete"
            :title="
              disableDelete
                ? 'Impossibile eliminare l\'utente attualmente in uso'
                : undefined
            "
            :use-popover="true"
          />
        </a-col>
      </a-row> -->

      <!-- Dati Anagrafici -->
      <a-row>
        <a-col :span="24">
          <a-divider class="title" orientation="left"
            >Dati Anagrafici</a-divider
          >
          <a-descriptions
            :labelStyle="{ fontWeight: 'bold', width: '15%' }"
            bordered
            size="small"
          >
            <a-descriptions-item label="ID Membro">
              {{ detailInfo.id }}
            </a-descriptions-item>
            <a-descriptions-item label="Nome Discord">
              {{ detailInfo.discord_name }}
            </a-descriptions-item>
            <a-descriptions-item label="Nome Reale">
              {{ detailInfo.real_name }}
            </a-descriptions-item>
            <a-descriptions-item label="Username">
              {{ detailInfo.username }}
            </a-descriptions-item>
            <a-descriptions-item label="Password">
              <SecretField :real-value="detailInfo.rawCredential" />
            </a-descriptions-item>
            <a-descriptions-item label="Attivo">
              <ActiveStatus :active="detailInfo.is_active" align="left" />
            </a-descriptions-item>
            <a-descriptions-item label="Profilo">
              <a-tag :color="detailInfo.profile.color">{{
                detailInfo.profile.text
              }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="Data Creazione">
              {{ detailInfo.creation_date }}
            </a-descriptions-item>
            <a-descriptions-item label="Ultima Modifica">
              {{ detailInfo.update_date }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
      <br />

      <!-- Personaggi -->
      <a-row
        :span="24"
        type="flex"
        justify="center"
        align="middle"
        class="card-container"
      >
        <a-col :span="24">
          <a-divider class="title" orientation="left">Personaggi</a-divider>
          <a-row :span="24" type="flex" justify="center" align="middle">
            <a-card class="char-wrapper">
              <a-card-grid
                style="max-width: 20%"
                v-for="(char, index) in detailInfo.characters"
                :key="index"
              >
                <a-badge-ribbon
                  :text="char.in_guild ? 'Gildato' : 'Non Gildato'"
                  :color="
                    char.in_guild
                      ? 'var(--primary-green)'
                      : 'var(--primary-red)'
                  "
                >
                  <a-card
                    size="small"
                    :class="char.in_guild ? 'c_in_guild' : 'c_not_in_guild'"
                    :title="char.name"
                  >
                    <div class="char-info">
                      <ul v-if="char.in_guild">
                        <li>
                          <span class="c-info-label">Gildato da:</span>
                          {{ char.gilded_by || "N/A" }}
                        </li>
                        <li>
                          <span class="c-info-label">In Data:</span>
                          {{ char.date || "N/A" }}
                        </li>
                      </ul>
                      <ul v-else>
                        <li>-- <LockOutlined /> --</li>
                        <li>Personaggio da gildare</li>
                      </ul>
                    </div>
                  </a-card>
                </a-badge-ribbon>
              </a-card-grid>
            </a-card>
          </a-row>
        </a-col>
      </a-row>
    </a-skeleton>

    <!-- <ModalUpdateUser
      v-if="updateModalVisible"
      :userInfo="detailInfo"
      :visible="updateModalVisible"
      @close="updateToggleModal"
    /> -->

    <!-- <a-result
      v-if="errors"
      :sub-title="errors.errorDescription"
      status="error"
      title="Impossibile caricare l'Utente"
    >
      <template #extra>
        <router-link :to="{ name: 'UserList' }">
          Torna alla lista Membri
        </router-link>
      </template>
    </a-result> -->
  </div>
</template>

<style lang="postcss" scoped>
.char-wrapper {
  width: 100%;
  border: none;

  :deep(.ant-card-grid) {
    box-shadow: none;
  }

  :deep(.c_in_guild) {
    border: 1px solid var(--dark-red);

    :deep(.char-info) {
      width: 100%;
      height: 75px;

      :deep(ul) {
        color: var(--dark-grey);
        font-size: 0.9em;
        list-style: none;
        padding-left: 10px;

        :deep(li) {
          margin-bottom: 5px;
        }

        :deep(.c-info-label) {
          display: inline-block;
          text-align: right;
          font-weight: bold;
          margin-right: 10px;
          width: 75px;
        }
      }
    }

    :deep(.ant-card-head) {
      background-color: var(--pale-red);
      color: var(--dark-red);
      border-bottom: 1px solid var(--dark-red);
    }
  }

  :deep(.c_not_in_guild) {
    border: 1px solid var(--dark-red);

    :deep(.char-info) {
      width: 100%;
      height: 75px;

      :deep(ul) {
        color: var(--primary-grey);
        font-size: 0.9em;
        list-style: none;
        padding-left: 0px;
        text-align: center;

        :deep(.anticon) {
          color: var(--primary-grey);
          font-size: large;
        }

        :deep(li) {
          margin-bottom: 5px;
        }

        :deep(.c-info-label) {
          display: inline-block;
          text-align: right;
          font-weight: bold;
          margin-right: 10px;
          width: 75px;
        }
      }
    }

    :deep(.ant-card-head) {
      background-color: var(--pale-red);
      color: var(--dark-red);
      border-bottom: 1px solid var(--dark-red);
    }
  }
}

.tim-collapse {
  background-color: transparent;

  .ant-collapse-item {
    border: 0;
  }
}

.anticon,
.ant-collapse
  > .ant-collapse-item
  > .ant-collapse-header
  > .ant-collapse-arrow {
  color: var(--primary-red);
  font-size: larger;
}
.btn-img {
  width: 24px;
  margin-right: 5px;
}

.primary-actions {
  margin-bottom: 2em;
}

.anticon.anticon-share-alt {
  font-size: large;
  color: var(--dark-blue);
  line-height: 0;
}

.anticon.anticon-check-circle {
  font-size: large;
  color: var(--red);
  line-height: 0;
}

.anticon.anticon-forward {
  font-size: large;
  color: var(--primary-blue);
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: sub;
}

.popconfirm-icon {
  color: var(--orange);
  font-size: initial;
  margin-right: 15px;
}
</style>
