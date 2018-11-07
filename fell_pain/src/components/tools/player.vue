<style lang="less">
#player-vue-id {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
  &.type-1 {
    padding-top: 170px;
    .video-wrapper {
      position: fixed;
      z-index: 1000;
      left: 10px;
      right: 10px;
      display: block;
      top: 0px;
      height: 150px;
    }
  }
  .video-wrapper {
    padding-top: 10px;
    background-color: #fff;
    height: 250px;
  }
  .list-wrapper {
    margin-top: 15px;
    margin-bottom: 40px;
    .move {
      &.active {
        background-color: #7ce7ff;
        .mint-cell-text {
          // color: #fff;
        }
      }
    }
  }
  #video-id {
    width: 100%;
    height: 100%;
    background: black;
  }
}
</style>
<template>
  <div id='player-vue-id' ref="parentDom">
    <mt-tab-container v-model="model">
      <mt-tab-container-item id="player-tab-id">
        <div class="video-wrapper">

          <video ref="videoDom" id="video-id" controls :src="active.src"></video>
        </div>
        <div class="list-wrapper">
          <!-- <div @click="player(item)" class="move" :key="item.id" v-for="item in moveList">
          </div> -->
          <mt-cell-swipe :title="item.name" :label="item.id === item.name ? '系统':'用户'" @click.native="player(item)" :class="active.id === item.id ? 'active' : ''" class='move' :key="item.id" v-for="item in moveList">
          </mt-cell-swipe>

        </div>
      </mt-tab-container-item>

    </mt-tab-container>
    <mt-tab-container id="config-tab-id">

    </mt-tab-container>

    <mt-tabbar fixed v-model="model">
      <mt-tab-item id="player-tab-id">

        播放器
      </mt-tab-item>
      <mt-tab-item id="config-tab-id">
        配置
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>
<script>
import AxiosHelper from "@/assets/lib/AxiosHelper.js";
export default {
  name: "player_vue",
  data() {
    return {
      model: "player-tab-id",
      requestPlayerPrefix: "/player/player",
      active: {
        src: "",
        id: ""
      },
      moveList: []
    };
  },
  methods: {
    request_player_get() {
      AxiosHelper.request({
        method: "post",
        url: this.requestPlayerPrefix + "/get",
        data: {}
      }).then(response => {
        this.moveList = response.data;
      });
    },
    request_player_play(argMove) {
      this.$refs.videoDom.src =
        "/api" +
        "/" +
        this.requestPlayerPrefix +
        "/" +
        encodeURIComponent(argMove.name);
    },
    player(argMove) {
      this.active.id = argMove.id;
      console.log(this.active.id, argMove.id);
      this.request_player_play(argMove);
    }
  },
  computed: {},
  mounted() {
    window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= 10) {
        this.$refs.parentDom.classList.add("type-1");
      } else {
        this.$refs.parentDom.classList.remove("type-1");
      }
    });
    this.request_player_get();
  }
};
</script>