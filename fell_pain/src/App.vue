<style lang="less">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @width: 400px;

  #qrcode-id {
    display: block;

    transition: none;
    text-align: center;
  }

  #mint-ui-id {
    position: fixed;

    display: block;

    width: @width;
    height: 100%;
    margin-left: 10px;

    border-left: 1px solid #ccc;
  }

  .main-wrapper {
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: @width + 20px;

    border-left: 1px solid #ccc;
  }
}

</style>
<template>
  <div id="app">
    <iframe id="mint-ui-id"  src="https://mint-ui.github.io/docs/#/zh-cn2/infinite-scroll" frameborder="0"></iframe>
    <div class="main-wrapper">

      <div id="qrcode-id" ref="qrcode"></div>
      <div class="practice">
        <ul v-infinite-scroll>

        </ul>
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


