<style lang="less">
#index-vue-id {
  width: 100%;
  height: 100%;
  #qrcode-id {
    position: fixed;
    z-index: 999;

    width: 100%;
    height: 100%;

    transition: 0.25s ease-in-out;
    transform: scale(0);

    background-color: rgba(0, 0, 0, 0.5);

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
}
</style>
<template>
  <div id='index-vue-id'>
    <vue-touch
      tag="div"
      @doubletap="closeQrcode"
    >
      <div
        id="qrcode-id"
        ref="qrcode"
      ></div>
    </vue-touch>

    <LocalizePagecontainer
      @change-page="change_page"
      :selected-index="selectedIndex"
      :footer-list="['应用列表','我']"
    >

      <LocalizeHeader
        slot="header"
        title="7号楼"
      >

        <LocalizeDropmenu
          slot="right"
          :menu-item="[{icon:'icon-weibiaoti--',content:'二维码分享'},{icon:'icon-bug',content:isDebug?'关闭调试':'打开调试'}]"
          @tap-item="tapItem"
        ></LocalizeDropmenu>
      </LocalizeHeader>
      <div slot="page-0">
        <div
          v-for="(item,index) in appList"
          :key="index"
        >
          <router-link :to="item.to">{{item.name}}</router-link>
        </div>
      </div>

      <div slot="page-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique.
      </div>
    </LocalizePagecontainer>
  </div>
</template>
<script>
import Vconsole from "vconsole";
import QRCode from "qrcodejs2";
import LocalizePagecontainer from "@/Localize-UI/Localize-pagecontainer.vue";
import LocalizeHeader from "@/Localize-UI/Localize-header.vue";
import LocalizeDropmenu from "@/Localize-UI/Localize-dropmenu.vue";
export default {
  name: "index_vue",
  data() {
    return {
      appList: [
        {
          name: "手脑通",
          to: {
            name: "player"
          },
          describe: "建立手机和电脑的数据传输通道。"
        }
      ],
      selectedIndex: 0,
      isDebug: false
    };
  },
  components: {
    QRCode,
    LocalizePagecontainer,
    LocalizeHeader,
    LocalizeDropmenu
  },
  methods: {
    change_page(argPage) {
      console.log(argPage);
      this.selectedIndex = argPage;
    },
    change_components() {
      console.log(this);
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
  computed: {},
  mounted() {}
};
</script>