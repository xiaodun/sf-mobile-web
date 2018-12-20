<style lang="less">
@import '~@/Localize-UI/Localize-UI.less';

* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  width: 100%;
  height: 100%;
}

.placehoder-top {
  padding-top: @header-height;
}

body {
  overflow-y: auto;

  background-color: #fff;

  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#qrcode-id {
  position: fixed;
  z-index: 999;

  width: 100%;
  height: 100%;

  transition: .25s ease-in-out;
  transform: scale(0);

  background-color: rgba(0, 0, 0, .5);

  img {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &.active {
    transform: scale(1);
  }
}

</style>
<template>
  <div id="app">
    <vue-touch
      tag="div"
      @doubletap="closeQrcode"
    >
      <div
        id="qrcode-id"
        ref="qrcode"
      ></div>
    </vue-touch>
    <LocalizeHeader
      slot="header"
      :title="$store.state.title"
    >
      <vue-touch
        v-if="$router.history.current.path != '/'"
        slot="left"
        class="iconfont icon-fanhui"
        @tap="back"
      ></vue-touch>
      <LocalizeDropmenu
        slot="right"
        :menu-item="[{icon:'icon-weibiaoti--',content:'二维码分享'},{icon:'icon-bug',content:isDebug?'关闭调试':'打开调试'}]"
        @tap-item="tapItem"
      ></LocalizeDropmenu>
    </LocalizeHeader>
    <div class="placehoder-top"></div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
import LocalizeHeader from "@/Localize-UI/Localize-header.vue";
import LocalizeDropmenu from "@/Localize-UI/Localize-dropmenu.vue";
import Vconsole from "vconsole";
import QRCode from "qrcodejs2";
export default {
  name: "App",
  data() {
    return {
      isDebug: false
    };
  },

  components: {
    QRCode,
    LocalizeHeader,
    LocalizeDropmenu
  },
  methods: {
    back() {
      this.$router.push("/");
      this.$store.commit("setTitle", "7号楼");
    },
    tapItem(argItem, argIndex) {
      if (argIndex === 0) {
        //点击了二维码
        this.createQrcode();
        this.$refs.qrcode.classList.add("active");
      } else if (argIndex === 1) {
        let vconsoleDom = document.getElementById("__vconsole");
        this.isDebug = !this.isDebug;
        if (this.isDebug) {
          if (vconsoleDom === null) {
            new Vconsole();
          } else {
            vconsoleDom.style.display = "block";
          }
        } else {
          vconsoleDom.style.display = "none";
        }
      }
    },
    closeQrcode() {
      this.$refs.qrcode.classList.remove("active");
    },
    createQrcode() {
      this.$refs.qrcode.innerHTML = "";
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "127.0.0.1"
      ) {
        this.$refs.qrcode.innerHTML = "请确保你连上了网络！";
      } else {
        new QRCode("qrcode-id", {
          width: 232, // 设置宽度
          height: 232, // 设置高度
          text: window.location.protocol + "//" + window.location.host
        });
      }
    }
  },
  mounted() {}
};
</script>



