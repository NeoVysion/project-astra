<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/stores/login";

const router = useRouter();
const loginStore = useLogin();

const formRef = ref();
const loading = ref(false);

const formState = reactive({
  username: undefined,
  credential: undefined,
});
const formRules = reactive({
  username: [
    {
      required: true,
      message: "Campo Username Obbligatorio",
    },
  ],
  credential: [
    {
      required: true,
      message: "Campo Password Obbligatorio",
    },
  ],
});

async function handleLogin() {
  loading.value = true;

  try {
    await formRef.value.validate();

    const success = await loginStore.login({
      username: formState.username,
      credential: formState.credential,
    });

    if (success) {
      router.push({ name: "Home" });
    }
  } catch (err) {
    // Se il form non valida, Ant Design mostra già i messaggi sotto ai campi;
    // qualunque altro errore imprevisto finisce loggato qui.
    console.error("Errore durante il login:", err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <a-row justify="center">
    <a-col :span="12">
      <a-card>
        <a-row>
          <a-col :span="22" :offset="1">
            <div class="title-wrapper">
              <a-row>
                <a-col :span="6">
                  <img
                    src="@/assets/images/logo_astra_1.png"
                    alt="UO"
                    class="uo-logo"
                  />
                </a-col>
                <a-col :span="18">
                  <div class="main-title">A.S.T.R.A.</div>
                  <div class="sub-title">
                    Autonomous System for Tasks and Resources Administration
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="18" :offset="3">
            <div style="margin-top: 10px">
              <a-form
                ref="formRef"
                :model="formState"
                :rules="formRules"
                :label-col="{
                  span: 5,
                }"
                :wrapper-col="{
                  span: 19,
                }"
                @keyup.enter="handleLogin"
              >
                <a-form-item label="Username" name="username">
                  <a-input
                    v-model:value="formState.username"
                    placeholder="Inserire lo username"
                  />
                </a-form-item>
                <a-form-item label="Password" name="credential">
                  <a-input-password
                    v-model:value="formState.credential"
                    placeholder="Inserire la password"
                  />
                </a-form-item>
              </a-form>
            </div>
            <div>
              <a-button
                type="primary"
                style="width: 96%; margin-left: 4%"
                :loading="loading"
                @click="handleLogin"
              >
                Login
              </a-button>
            </div>
          </a-col>
        </a-row>
        <a-divider />
        <a-row>
          <a-col :span="24">
            <a-alert class="login-alert" type="info" show-icon>
              <template #message>
                <b>IMPORTANTE: </b> Si consiglia di cambiare subito la propria
                password in caso di primo accesso.<br />
                Per richiedere un'account contattare l'Amministratore (Vysion) o
                un altro Emissario sul Discord di Gilda.
              </template>
            </a-alert>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped lang="postcss">
.title-wrapper {
  text-align: center;
  margin: auto 0;

  .main-title {
    font-family: "SAMARITAN";
    font-size: 5em;
    color: var(--primary-red);
  }

  .sub-title {
    font-family: "SAMARITAN";
    font-size: 1.1em;
    color: var(--dark-grey);
  }
}

.uo-logo {
  max-width: 120%;
}

.ant-alert :deep(.ant-alert-message) {
  font-family: "SAMARITAN";
  font-size: 11px;
  color: var(--dark-blue);
}
</style>
