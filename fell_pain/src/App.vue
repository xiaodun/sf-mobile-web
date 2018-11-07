<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  overflow-y: auto;
  padding-bottom: 30px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media screen and (max-width: 640px) {
    #qrcode-id {
      display: none;
    }
  }
}
</style>
<template>
  <div id="app">
    <div id="qrcode-id" ref="qrcode"></div>
    <Player></Player>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Player from "@/components/tools/player.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    QRCode,
    Player
  },
  methods: {
    createQecode() {
      this.$refs.qrcode.innerHTML = "";
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "127.0.0.1"
      ) {
        this.$refs.qrcode.innerHTML = "请确保你连上了网络！";
      } else {
        console.log(window.location.protocol + "//" + window.location.host);
        let qrcode = new QRCode("qrcode-id", {
          width: 232, // 设置宽度
          height: 232, // 设置高度
          text: window.location.protocol + "//" + window.location.host
        });
      }
    }
  },
  mounted() {
    this.createQecode();
  }
};
</script>


