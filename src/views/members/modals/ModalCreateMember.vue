<script setup>
import {
  reactive,
  ref,
  computed,
  toRaw,
  onBeforeMount,
  watch,
  toRefs,
} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import ActiveStatus from "@/components/ActiveStatus.vue";
import useLogin from "@/stores/login";
import {
  PlusOutlined,
  PlusCircleOutlined,
  InfoCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { toastMessage } from "@/utils/tools";
import Profile from "@/models/profile";
import { remove } from "ramda";
import { getList, createElement } from "@/db";

const emits = defineEmits(["close"]);
const props = defineProps({
  members: { type: Array },
  visible: { type: [Boolean, String] },
});

const loginStore = useLogin();
const formRef = ref();
const formState = reactive({
  username: "",
  credential: "",
  discord_name: "",
  real_name: "",
  profile: undefined,
  is_active: true,
  characters: [],
});
const formRule = {
  username: { required: true, message: "Campo Username obbligatorio" },
  credential: { required: true, message: "Campo Password obbligatorio" },
  discord_name: { required: true, message: "Campo Nome Discord obbligatorio" },
  profile: { required: true, message: "Campo Profilo obbligatorio" },
};

// Funzione per recuperare la lista dei profili
const recruiters = ref([]);
const profiles = ref([]);

const fetchProfiles = async () => {
  try {
    let allProfiles = await getList("profiles");

    const profileMap = {
      rec: allProfiles.filter((p) => p.is_recruiter).map((p) => p.profile_name),
      av: allProfiles
        .filter((p) => {
          const userLevel = loginStore.getProfile.p_level;
          const isLower = p.p_level < userLevel;
          const needEqualLevel = userLevel > 5 && p.p_level == userLevel;

          return isLower || needEqualLevel;
        })
        .map((p) => p.profile_name),
    };

    recruiters.value = props.members
      .filter((m) => profileMap.rec.includes(m.profile))
      .map((m) => ({ value: m.discord_name }));
    profiles.value = Profile.getProfileTags().filter((p) =>
      profileMap.av.includes(p.value),
    );
  } catch (error) {
    console.error("Errore durante il recupero dei profili:", error);
  }
};

// Funzione per creare un nuovo membro
const loading = ref(false);
const createMember = async (memberData) => {
  try {
    loading.value = true;
    const memberId = await createElement("users", memberData);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Errore durante la creazione del membro:", error);
  }
};

const addCharacter = () => {
  formState.characters.push({
    name: "",
    in_guild: true,
    gilded_by: undefined,
    date: undefined,
  });
};

const removeCharacter = (char, index) => {
  formState.characters = remove(index, 1, formState.characters);
};

const onClose = (value) => {
  formRef.value.resetFields();
  emits("close", value);
};

const onSubmit = async () => {
  try {
    await formRef.value.validate();
    const data = toRaw(formState);

    await createMember(data);
    toastMessage(`Membro ${data.username} creato con successo`, "success");
    onClose(true);
  } catch (error) {
    toastMessage(`Errore durante la creazione del nuovo membro`, "error");
  }
};

onBeforeMount(() => {
  fetchProfiles();
});
</script>

<template>
  <teleport to="body">
    <a-modal
      :open="visible"
      @cancel="() => onClose(false)"
      class="alarm-modal"
      width="75vw"
    >
      <template #footer>
        <div>
          <a-button class="tim-btn" @click="() => onClose(false)">
            Annulla
          </a-button>
          <a-button type="primary" class="tim-btn" @click="onSubmit">
            <span v-if="!loading">Crea</span>
            <a-spin v-else />
          </a-button>
        </div>
      </template>

      <PageHeader title="Aggiunta Membro" :icon="PlusCircleOutlined" />
      <a-row type="flex" class="action-container" justify="center">
        <a-col span="24">
          <a-form
            class="tim-form vpn-form"
            :model="formState"
            :rules="formRule"
            ref="formRef"
            :label-col="{
              span: 6,
            }"
            :wrapper-col="{
              offset: 1,
              span: 14,
            }"
          >
            <a-row :span="24" type="flex" justify="center" align="middle">
              <a-col :span="12">
                <a-form-item label="Username" name="username">
                  <a-input
                    v-model:value="formState.username"
                    placeholder="Inserire uno username"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Password" name="credential">
                  <a-input-password
                    v-model:value="formState.credential"
                    placeholder="Inserire una password"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :span="24" type="flex" justify="center" align="middle">
              <a-col :span="12">
                <a-form-item label="Nome Discord" name="discord_name">
                  <a-input
                    v-model:value="formState.discord_name"
                    placeholder="Inserire un nome Discord"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Nome Reale" name="real_name">
                  <a-input
                    v-model:value="formState.real_name"
                    placeholder="Inserire un nome reale"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :span="22" type="flex" justify="center" align="middle">
              <a-col :span="12">
                <a-form-item label="Profilo" name="profile">
                  <a-select
                    v-model:value="formState.profile"
                    placeholder="Selezionare un Profilo"
                  >
                    <a-select-option
                      v-for="p in profiles"
                      :key="p.value"
                      :value="p.value"
                    >
                      <a-tag :color="p.color">{{ p.text }}</a-tag>
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Attivo" name="is_active">
                  <a-radio-group
                    v-model:value="formState.is_active"
                    style="width: 100%"
                  >
                    <a-radio-button
                      :value="true"
                      style="width: 50%; text-align: center"
                    >
                      <ActiveStatus
                        :active="true"
                        iconType="default"
                        :titles="{ true: 'No', false: 'Si' }"
                        align="left"
                        style="display: inline-block; margin-right: 5px"
                      />
                      Si
                    </a-radio-button>
                    <a-radio-button
                      :value="false"
                      style="width: 50%; text-align: center"
                    >
                      <ActiveStatus
                        :active="false"
                        iconType="default"
                        :titles="{ true: 'No', false: 'Si' }"
                        align="left"
                        style="display: inline-block; margin-right: 5px"
                      />
                      No
                    </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>

            <!-- CHARACTERS MANAGMENT -->
            <a-row :span="22">
              <a-col :span="24">
                <a-divider class="title" orientation="center">
                  Personaggi
                </a-divider>
              </a-col>
            </a-row>
            <a-row :span="22" type="flex" justify="center" align="middle">
              <a-col :span="8">
                <a-button
                  type="dashed"
                  class="add-char-btn"
                  style="width: 100%"
                  @click="addCharacter"
                >
                  <PlusOutlined />
                  Aggiungi Personaggio
                </a-button>
              </a-col>
            </a-row>

            <a-row :span="24" type="flex" justify="center" align="middle">
              <a-col
                :span="11"
                v-for="(char, index) in formState.characters"
                :key="index"
              >
                <a-card size="small" :bordered="true">
                  <a-row :span="24">
                    <a-col :span="2">
                      <CloseCircleOutlined
                        class="delete-char-btn"
                        title="Rimuovi PG"
                        @click="removeCharacter(char, index)"
                      />
                      <a-divider type="vertical" style="height: 98px" />
                    </a-col>

                    <a-col :span="22">
                      <a-row :span="24" type="flex" justify="center">
                        <a-col :span="12">
                          <a-form-item
                            :name="['characters', index, 'name']"
                            :rules="{
                              required: true,
                              message: 'Campo Nome PG Obbliatorio',
                            }"
                            label="Nome PG"
                            :label-col="{
                              span: 7,
                            }"
                            :wrapper-col="{
                              offset: 1,
                              span: 15,
                            }"
                          >
                            <a-input
                              v-model:value="char.name"
                              placeholder="Inserire il nome PG"
                            />
                          </a-form-item>
                        </a-col>

                        <a-col :span="12">
                          <a-form-item
                            :name="['characters', index, 'in_guild']"
                            label="In Gilda"
                            :label-col="{
                              span: 7,
                            }"
                            :wrapper-col="{
                              offset: 1,
                              span: 15,
                            }"
                          >
                            <a-radio-group
                              v-model:value="char.in_guild"
                              style="width: 100%"
                            >
                              <a-radio-button
                                :value="true"
                                style="width: 50%; text-align: center"
                              >
                                <ActiveStatus
                                  :active="true"
                                  iconType="default"
                                  :titles="{ true: 'No', false: 'Si' }"
                                  align="left"
                                  style="
                                    display: inline-block;
                                    margin-right: 5px;
                                  "
                                />
                                Si
                              </a-radio-button>
                              <a-radio-button
                                :value="false"
                                style="width: 50%; text-align: center"
                              >
                                <ActiveStatus
                                  :active="false"
                                  iconType="default"
                                  :titles="{ true: 'No', false: 'Si' }"
                                  align="left"
                                  style="
                                    display: inline-block;
                                    margin-right: 5px;
                                  "
                                />
                                No
                              </a-radio-button>
                            </a-radio-group>
                          </a-form-item>
                        </a-col>

                        <a-col :span="12">
                          <a-form-item
                            :name="['characters', index, 'gilded_by']"
                            label="Gildato da"
                            :label-col="{
                              span: 7,
                            }"
                            :wrapper-col="{
                              offset: 1,
                              span: 15,
                            }"
                          >
                            <a-auto-complete
                              v-model:value="char.gilded_by"
                              :options="recruiters"
                              :filter-option="
                                (input, option) =>
                                  option.value
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                              "
                            />
                          </a-form-item>
                        </a-col>

                        <a-col :span="12">
                          <a-form-item
                            :name="['characters', index, 'date']"
                            label="Data"
                            :label-col="{
                              span: 7,
                            }"
                            :wrapper-col="{
                              offset: 1,
                              span: 15,
                            }"
                          >
                            <a-date-picker
                              v-model:value="char.date"
                              format="DD MMMM YYYY"
                              placeholder=""
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>
  </teleport>
</template>

<style scoped lang="postcss">
.anticon.anticon-close-circle {
  color: var(--dark-red);
  font-size: initial;
}

.add-char-btn {
  margin-bottom: 20px;
  color: var(--primary-red);
  border-color: var(--primary-red);

  &:hover {
    background-color: var(--primary-red);
    color: white;
    border-color: white;
  }
}

.ant-card {
  height: 120px;
  margin-right: 2%;
  margin-bottom: 2%;
  box-shadow: none;
  background-color: transparent;
}
.ant-card .ant-card-grid {
  padding: 2px;
  font-size: 0.9em;
}
</style>
