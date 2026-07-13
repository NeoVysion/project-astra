<script setup>
import db from "@/db";
import { ref, onBeforeMount } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Member from "@/models/member";
import { TeamOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Table from "@/components/tables/Table.vue";
import { toastMessage } from "@/utils/tools";
// import ActionBtnMini from "@/components/buttons/ActionBtnMini.vue";
// import ModalCreateMember from "./modals/ModalCreateMember.vue";
// import { useModal } from "@/hooks/generic-hooks";

const router = useRouter();

// Riferimento a una lista reattiva di users
const loading = ref(false);
const members = ref([]);

// Funzione per recuperare la lista degli users da Firestore
const fetchMembers = async () => {
  try {
    loading.value = true;
    members.value = await db.members.list();
  } catch (error) {
    toastMessage(`Errore durante il recupero dei membri: ${error}`, "error");
  } finally {
    loading.value = false;
  }
};

// const createModal = useModal(fetchMembers);
// const createToggleModal = ref(createModal.toggleModal);
// const createModalVisible = ref(createModal.modalVisible);

// Chiamata alla funzione fetchUsers quando il componente viene montato
onBeforeMount(() => {
  fetchMembers();
});

const goToDetail = (member) => {
  router.push({
    name: "MemberDetail",
    params: { id_member: member.id },
  });
};

const membersLayout = ref(
  Member.getLayoutMembersList({ actions: { goToDetail } }),
);
</script>

<template>
  <div class="">
    <PageHeader title="Lista Membri" :icon="TeamOutlined" />
    <!-- <a-row
      type="flex"
      justify="start"
      align="middle"
      style="margin-bottom: 20px"
    >
      <a-col :span="24">
        <ActionBtnMini
          label="Aggiungi Membro"
          :img="PlusCircleOutlined"
          img-color="rgb(0, 140, 85)"
          size="large"
          class="btn-action"
          @click="() => createToggleModal(false)"
        />
      </a-col>
    </a-row> -->
    <a-row type="flex" justify="center" align="middle" :gutter="[0, 32]">
      <a-col :span="24">
        <div class="center" v-if="loading">
          <a-spin class="jade-red" size="large" tip="Caricamento in corso..." />
        </div>
        <Table
          v-else
          :data="members"
          :layout="membersLayout"
          :loading="loading"
        />
        <!-- <ModalCreateMember
          :members="members"
          :visible="createModalVisible"
          @close="createToggleModal"
        /> -->
      </a-col>
    </a-row>
    <br />
  </div>
</template>
