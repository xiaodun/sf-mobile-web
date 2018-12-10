<style lang="less">
#index-vue-id {
  width: 100%;
  height: 100%;
  .app-preview {
    padding: 0.5em;
    width: 85%;
    min-height: 200px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1), 0 0 3px 1px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    margin: 1em auto 1.5em auto;
    img {
      pointer-events: none;
      max-width: 100%;
      min-width: 100%;
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
  <div id='index-vue-id'>

    <LocalizePagecontainer
      @change-page="change_page"
      :selected-index="selectedIndex"
      :footer-list="['应用列表','我']"
    >

      <div slot="page-0">
        <vue-touch
          class="app-preview"
          @tap="in_app(item)"
          v-for="(item,index) in appList"
          :key="index"
        >
          <img
            :src="item.src"
            alt=""
          >
          <h3 class="name">{{item.name}}</h3>
          <div class="describe">{{item.describe}}</div>
        </vue-touch>
      </div>

      <div slot="page-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique.
      </div>
    </LocalizePagecontainer>
  </div>
</template>
<script>
import LocalizePagecontainer from "@/Localize-UI/Localize-pagecontainer.vue";

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
          src: "/static/pc-mobile-connect.png",
          describe: "建立手机和电脑的视频传输通道。"
        }
      ],
      selectedIndex: 0
    };
  },
  components: {
    LocalizePagecontainer
  },
  methods: {
    in_app(argItem) {
      this.$router.push(argItem.to);
      this.$store.commit("setTitle", argItem.name);
    },
    change_page(argPage) {
      this.selectedIndex = argPage;
    }
  },
  computed: {},
  mounted() {}
};
</script>