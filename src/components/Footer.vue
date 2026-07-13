<script setup>
import { version } from "@/../package.json";
</script>

<template>
  <a-row justify="center">
    <a-col :span="3">
      <div class="footer-logo">
        <a href="https://discord.gg/XJ5k89fUQu" target="_blank">
          <a-card hoverable size="small">
            <template #cover>
              <img
                src="@/assets/images/logo_ita.png"
                alt="Discord Gilda"
                title="Discord di Gilda"
              />
            </template>
          </a-card>
        </a>

        <a href="https://discord.gg/uooutlands" target="_blank">
          <a-card hoverable size="small">
            <template #cover>
              <img
                src="@/assets/images/logo_outlands.png"
                alt="Discord Outlands"
                title="Discord di Oulands"
              />
            </template>
          </a-card>
        </a>
      </div>
    </a-col>
    <a-col :span="16" class="footer-copyrights">
      <div class="footer-message">
        Heavily Inspired By
        <a href="https://www.youtube.com/watch?v=HQXmfAGOe0Y" target="_blank">
          <span>
            Person of Interest - TV Series | Samaritan | The Machine
          </span>
        </a>
        <br />
        Copyright © {{ new Date().getFullYear() }} by VysionTV and GGGGGilda
        ITA. All Rights Reserved.<br />
        UO A.S.T.R.A. - Version {{ version }}<br />
      </div>
    </a-col>
    <a-col :span="5" class="browsers">
      Optimized for:
      <img src="@/assets/images/logo_chrome.png" alt="Chrome" title="Chrome" />
      <img
        src="@/assets/images/logo_firefox.png"
        alt="Firefox"
        title="Firefox"
      />
      <img src="@/assets/images/logo_edge.png" alt="Edge" title="Edge" />
    </a-col>
  </a-row>
</template>

<style scoped lang="postcss">
.footer-logo {
  text-align: left;

  .ant-card {
    padding: 10px;
    width: 45px;
    border: 1px solid silver;
  }

  a {
    display: inline-block;
    max-width: 45px;
    margin-right: 10px;
  }

  img {
    max-width: 25px;
  }
}
.footer-copyrights {
  text-align: center;

  .footer-message {
    font-size: small;
  }
}

.browsers {
  font-family: "SAMARITAN";
  font-size: small;
  display: flex;
  align-items: center;
  justify-content: end;

  > img {
    width: 24px;
    margin: 0 1em;
  }
}
</style>
