<style lang="less">
@import "~@/Localize-UI/Localize-UI.less";

#index-vue-id {
  width: 100%;
  height: ~"calc(100% - @{header-height})";

  .app-preview {
    width: 85%;
    min-height: 200px;
    margin: 1em auto 1.5em auto;
    padding: 0.5em;

    border-radius: 20px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1), 0 0 3px 1px rgba(0, 0, 0, 0.3);

    img {
      width: 100%;
      display: none;
      transition: height 0.45s ease-in-out;

      pointer-events: none;

      border-radius: inherit;
    }

    .name {
      margin-top: 0.1em;
      margin-bottom: 0.1em;
    }

    .describe {
      color: #333;
    }
  }
}
</style>
<template>
  <div id="index-vue-id">
    <LocalizePagecontainer
      @change-page="change_page"
      :selected-index="selectedIndex"
      :footer-list="['应用列表','我']"
    >
      <LocalizePage>
        <vue-touch
          class="app-preview"
          @tap="in_app(item)"
          v-for="(item,index) in appList"
          :key="index"
        >
          <img :src="item.src" v-imgloaded alt>
          <h3 class="name">{{item.name}}</h3>
          <div class="describe">{{item.describe}}</div>
        </vue-touch>
      </LocalizePage>

      <LocalizePage>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique.</LocalizePage>
    </LocalizePagecontainer>
  </div>
</template>
<script>
export default {
  name: "index_vue",
  data() {
    return {
      appList: [
        {
          to: {
            name: "player"
          },
          src: "/static/pc-mobile-connect.png",
          describe: "建立手机和电脑的视频传输通道。"
        },
        {
          to: {
            name: "compass"
          },
          src: "/static/compass-logo.jpg",
          describe: "给迷路的你一个方向"
        }
      ],
      selectedIndex: 0
    };
  },
  directives: {
    imgloaded(el) {
      addEventListener(
        "load",
        () => {
          el.style.display = "block";
          let { height } = el.getBoundingClientRect();
          el.style.height = 0;
          requestAnimationFrame(() => {
            el.style.height = height + "px";
          });
        },
        {
          once: true
        }
      );
      el.addEventListener(
        "transitionend",
        () => {
          el.style.height = "";
        },
        {
          once: true
        }
      );
    }
  },
  methods: {
    in_app(argItem) {
      this.$router.push(argItem.to);
    },
    change_page(argPage) {
      this.selectedIndex = argPage;
    }
  },
  computed: {},
  mounted() {}
};
</script>