<style lang="less">
#player-vue-id {
  overflow-y: auto;

  box-sizing: border-box;
  height: 100%;
  padding: 10px 10px 0;

  &.type-1 {
    #video-id {
      position: absolute;
      right: 10px;
      left: 20px;

      display: block;

      width: auto;

// top: 0;
      margin-right: 10px;
      margin-left: 30px;
    }

    .list-wrapper {
      margin-top: 20%;
    }
  }

  #video-id {
    width: 100%;
    height: 45%;

    background: black;
  }
}

</style>
<template>
  <div id='player-vue-id' ref="parentDom">
    <div ref="videoDom" id="video-id" controls :src="active.src"></div>
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
    this.$refs.parentDom.addEventListener('scroll', () => {
      let scrollTop = this.$refs.parentDom.scrollTop;
      if (scrollTop >= 10) {
        this.$refs.parentDom.classList.add('type-1');
      } else {
        this.$refs.parentDom.classList.remove('type-1');
      }
    });
    this.request_player_get();
  },
};
</script>