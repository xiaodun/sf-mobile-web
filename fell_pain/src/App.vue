<template>
  <div id="app">
    <a href="https://mint-ui.github.io/docs/#/zh-cn2" target="_blank">Mint UI</a>
    <div id="qrcode-id" ref="qrcode"></div>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px', 'overflow-y': 'auto' }">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul>
            <li :key="index" v-for="(item,index) in list">{{ item }}</li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  name: 'App',
  data() {
    return {
      list: [1, 2, 3, 4, 1],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 200,
    };
  },
  components: {
    QRCode,
  },
  methods: {
    loadTop() {
      this.list.push(4);
      this.$refs.loadmore.onTopLoaded();
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },

    loadBottom() {
      this.list.push(12);
      this.$refs.loadmore.onBottomLoaded();
    },
    createQecode() {
      this.$refs.qrcode.innerHTML = '';
      if (
        window.location.hostname == 'localhost' ||
        window.location.hostname == '127.0.0.1'
      ) {
        this.$refs.qrcode.innerHTML = '请确保你连上了网络！';
      } else {
        let qrcode = new QRCode('qrcode-id', {
          width: 232, // 设置宽度
          height: 232, // 设置高度
          text: window.location.href,
        });
      }
    },
  },
  mounted() {
    this.createQecode();
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  margin-top: 60px;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #qrcode-id {
    display: inline-block;

    transition: none;
    text-align: center;
  }
}

.director-mail {
  .page-loadmore {
    overflow: scroll;

    margin-top: 40px;

    .page-loadmore-list {
      .page-loadmore-listitem {
        line-height: 100px;

        height: 100px;

        text-align: center;

        border-bottom: solid 1px #eee;
      }
    }

    .mint-loadmore-bottom {
      span {
        display: inline-block;

        transition: .2s linear;
        vertical-align: middle;
      }

      .mint-spinner {
        display: inline-block;

        vertical-align: middle;
      }
    }
  }
}

</style>
