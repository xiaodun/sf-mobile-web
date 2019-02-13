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

    .no-data {
      margin-top: 55px;

      text-align: center;
    }
  }

  .mint-tabbar.is-fixed {
    z-index: 90;
  }

  &.type-1 {
    .video-wrapper {
      position: fixed;
      z-index: 90;
      top: 35px;
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
  <div id="player-vue-id" ref="parentDom">
    <mt-tab-container v-model="model">
      <mt-tab-container-item class="player-tab" id="player-tab-id">
        <div class="video-wrapper">
          <video autoplay ref="videoDom" id="video-id" controls :src="active.src"></video>
        </div>
        <div class="list-wrapper" v-if="moveList && moveList.length>0">
          <mt-cell-swipe
            :left="[item.isTemp ? []:{handler:()=>request_download_file(item),content:'下载',style:{backgroundColor:'#74fd3d',color:'#fff',handle:()=>down_file(item)}}]"
            :right="item.isUser || item.isTemp ?[{handler:()=>request_delete_file(item,index),content:'删除',style:{background:'#fd593d',color:'#fff'}}]:[]"
            :title="item.name"
            :label="!item.isUser ? item.isTemp ?'本地文件': '系统'  :'用户'"
            @click.native="player(item)"
            :class="active.id === item.id ? 'active' : ''"
            class="move"
            :key="Math.random()"
            v-for="(item,index) in  moveList"
          >
            <!-- 解决添加数据后 显示错乱的问题   :key="Math.random()"   -->
          </mt-cell-swipe>
        </div>
        <div class="no-data" v-if="moveList && moveList.length === 0">暂无视频</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="config-tab-id">
        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-cunchu1" size="16px"></LocalizeIconfont>
          <div slot="title">电脑目录</div>
          <div slot="content">程序从电脑的 C:\sf-mobile-web\player\system\movie 获取视频</div>
        </localize-card>
        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-Shapecopy" size="16px"></LocalizeIconfont>
          <div slot="title">上传本地视频</div>
          <div slot="content">
            <div class="item">存储至:C:\sf-mobile-web\player\user\movie</div>
            <LocalizeUpload
              @success="upload_success"
              :uri="requestPlayerPrefix+'/upload'"
              multiple
              class="item"
              accept="video/*"
            ></LocalizeUpload>
          </div>
        </localize-card>

        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-tianjiashipin-m" size="16px"></LocalizeIconfont>
          <div slot="title">添加本地视频到列表</div>
          <div slot="content">
            <LocalizeNativefile multiple accept="video/*" @success="readerSuccess"></LocalizeNativefile>
          </div>
        </localize-card>
        <localize-card>
          <LocalizeIconfont slot="icon" icon="icon-guanyuruanjian" size="16px"></LocalizeIconfont>
          <div slot="title">关于程序</div>
          <div slot="content">
            <p>为了减缓手机内存的压力,自定义的本地视频播放体验,应个人需求而制作。</p>
            <p>碍于浏览器支持的音频格式有限,无法播放视频实属正常!</p>
          </div>
        </localize-card>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar fixed v-model="model">
      <mt-tab-item id="player-tab-id">播放器</mt-tab-item>
      <mt-tab-item id="config-tab-id">配置</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import BuiltServiceConfig from "@root/service/app/config.json";
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
      moveList: null
    };
  },
  methods: {
    readerSuccess(argFile) {
      this.moveList.unshift({
        name: argFile.name,
        isTemp: true,
        id: ((Math.random() * 100000) | 0) + argFile.name,
        src: URL.createObjectURL(argFile)
      });
    },
    request_delete_file(argItem, index) {
      if (argItem.isTemp) {
        this.moveList.splice(index, 1);
      } else {
        if (argItem.id === this.active.id) {
          //会引发后台报错  做一些简单的限制 这里只能限制当前客户端 对于多端无效
          Toast("该视频已经播放!");
          return;
        }
        this.$axios
          .request({
            method: "post",
            url: this.requestPlayerPrefix + "/delete",
            data: {
              id: argItem.id
            }
          })
          .then(response => {
            Toast("删除成功");

            this.request_player_get();
          });
      }
    },
    upload_success() {
      this.request_player_get();
    },
    request_download_file(argItem) {
      //下载用户上传和系统文件
      Toast("下载中...");
      this.$axios
        .request({
          method: "post",
          url: this.requestPlayerPrefix + "/download",
          data: {
            id: argItem.isUser ? argItem.id : argItem.name,
            isUser: argItem.isUser
          },
          responseType: "blob"
        })
        .then(response => {
          var blob = response.data;
          var a = document.createElement("a");
          a.download = argItem.name;
          a.href = URL.createObjectURL(blob);
          document.body.appendChild(a);
          a.click();
          a.remove();
          Toast("已下载");
          URL.revokeObjectURL(a.href);
        });
    },
    request_player_get() {
      this.$axios
        .request({
          method: "post",
          url: this.requestPlayerPrefix + "/get",
          data: {}
        })
        .then(response => {
          this.moveList = response.data;
        });
    },
    request_player_play(argMove) {
      if (argMove.isTemp) {
        this.$refs.videoDom.src = argMove.src;
      } else {
        let index = argMove.name.lastIndexOf(".");
        if (argMove.isUser) {
          this.$refs.videoDom.src =
            BuiltServiceConfig.prefix +
            "/" +
            this.requestPlayerPrefix +
            "/" +
            encodeURIComponent(argMove.flag) +
            argMove.name.substring(index);
        } else {
          this.$refs.videoDom.src =
            BuiltServiceConfig.prefix +
            "/" +
            this.requestPlayerPrefix +
            "/" +
            encodeURIComponent(argMove.name);
        }
      }
    },
    player(argMove) {
      this.active.id = argMove.id;
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
  },
  watch: {
    model() {
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>