<style lang="less">
#player-vue-id {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 10px;

  .player-tab {
    overflow-y: auto;

    width: 100%;
    height: 100%;
  }

  .mint-tabbar.is-fixed {
    z-index: 1000000;
  }

  &.type-1 {
    .video-wrapper {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 10px;
      left: 10px;

      display: block;

      height: 150px;
    }

    .list-wrapper {
      padding-top: 170px;
    }
  }

  .video-wrapper {
    height: 250px;
    padding-top: 10px;

    background-color: #fff;
  }

  .list-wrapper {
    margin-top: 15px;
    margin-bottom: 40px;

    .move {
      &.active {
        .mint-cell-wrapper {
          border-bottom: none;
          background-color: #7ce7ff;
        }

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
      <mt-tab-container-item class='player-tab' id="player-tab-id">

        <div class="video-wrapper">

          <video ref="videoDom" id="video-id" controls :src="active.src"></video>
        </div>
        <div class="list-wrapper">
          <!-- <div @click="player(item)" class="move" :key="item.id" v-for="item in moveList">
          </div> -->
          <mt-cell-swipe :title="item.name" :label="!item.isUser ? '系统':'用户'" @click.native="player(item)" :class="active.id === item.id ? 'active' : ''" class='move' :key="item.id" v-for="item in moveList">
          </mt-cell-swipe>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="config-tab-id">

        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-cunchu1" size="16px"></LocalizeIconfont>
          <div slot="title">电脑目录</div>
          <div slot="content">
            程序从电脑的 C:\sf-mobile-web\player\system\movie 获取视频

          </div>
        </localize-card>
        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-Shapecopy" size="16px"></LocalizeIconfont>
          <div slot="title">上传本地视频</div>
          <div slot="content">
            <div class="item">存储至:C:\sf-mobile-web\player\user\movie</div>
            <LocalizeUpload :uri="requestPlayerPrefix+'/upload'" multiple class="item" accept="video/*"></LocalizeUpload>
          </div>
        </localize-card>

        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-tianjiashipin-m" size="16px"></LocalizeIconfont>
          <div slot="title">添加本地视频到列表</div>
          <div slot="content">

          </div>
        </localize-card>
        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-guanyuruanjian" size="16px"></LocalizeIconfont>
          <div slot="title">关于程序</div>
          <div slot="content">
            <p>

              为了减缓手机内存的压力,自定义的本地视频播放体验,应个人需求而制作。
            </p>
            <p>

              碍于浏览器支持的音频格式有限,无法播放视频实属正常!
            </p>

          </div>
        </localize-card>

      </mt-tab-container-item>

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
import LocalizeCard from '@/Localize-UI/Localize-card';
import LocalizeIconfont from '@/Localize-UI/Localize-iconfont';
import LocalizeUpload from '@/Localize-UI/Localize-upload';
import AxiosHelper from '@/assets/lib/AxiosHelper.js';
import axios from 'axios';
import BuiltServiceConfig from '@root/service/app/config.json';
export default {
  name: 'player_vue',
  data() {
    return {
      model: 'player-tab-id',
      requestPlayerPrefix: '/player/player',
      active: {
        src: '',
        id: '',
      },
      moveList: [],
    };
  },
  methods: {
    request_player_get() {
      AxiosHelper.request({
        method: 'post',
        url: this.requestPlayerPrefix + '/get',
        data: {},
      }).then(response => {
        this.moveList = response.data;
      });
    },
    // request_player_test() {
    //   AxiosHelper.request({
    //     // headers: {
    //     //   'Content-type': 'application/json',
    //     // },
    //     method: 'post',
    //     url: this.requestPlayerPrefix + '/test',
    //     data: 12,
    //   }).then(response => {
    //     this.moveList = response.data;
    //   });
    // },
    request_player_play(argMove) {
      let index = argMove.name.lastIndexOf('.');
      if (argMove.isUser) {
        this.$refs.videoDom.src =
          BuiltServiceConfig.prefix +
          '/' +
          this.requestPlayerPrefix +
          '/' +
          encodeURIComponent(argMove.flag) +
          argMove.name.substring(index);
      } else {
        this.$refs.videoDom.src =
          BuiltServiceConfig.prefix +
          '/' +
          this.requestPlayerPrefix +
          '/' +
          encodeURIComponent(argMove.name);
      }
    },
    player(argMove) {
      this.active.id = argMove.id;
      this.request_player_play(argMove);
    },
  },
  computed: {},
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= 10) {
        this.$refs.parentDom.classList.add('type-1');
      } else {
        this.$refs.parentDom.classList.remove('type-1');
      }
    });
    this.request_player_get();

    // this.request_player_test();
  },
  components: {
    LocalizeCard,
    LocalizeIconfont,

    LocalizeUpload,
  },
  watch: {
    model() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>