<style lang="less">
#player-vue-id {
  #video-id {
    width: 100%;
    height: 300px;
  }
}

</style>
<template>
    <div id='player-vue-id'>
        播放器
        <video ref="videoDom" id="video-id" controls :src="active.src"></video>
        <div class="list-wrapper">
            <div class="move" :key="item.id" v-for="item in moveList">
                <div @click="player(item)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import AxiosHelper from '@/assets/lib/AxiosHelper.js';
export default {
  name: 'player_vue',
  data() {
    return {
      requestPlayerPrefix: '/player/player',
      active: {
        src: '',
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
    request_player_play(argMove) {
      this.$refs.videoDom.src =
        '/api' +
        '/' +
        this.requestPlayerPrefix +
        '/' +
        encodeURIComponent(argMove.name);
    },
    player(argMove) {
      this.request_player_play(argMove);
    },
  },
  computed: {},
  mounted() {
    this.request_player_get();
  },
};
</script>