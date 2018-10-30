<template>
  <div id="app">
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
export default {
  name: "App",
  data() {
    return {
      list: [1, 2, 3, 4, 1],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 200
    };
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
    }
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.director-mail {
  .page-loadmore {
    margin-top: 40px;
    overflow: scroll;
    .page-loadmore-list {
      .page-loadmore-listitem {
        height: 100px;
        line-height: 100px;
        border-bottom: solid 1px #eee;
        text-align: center;
      }
    }

    .mint-loadmore-bottom {
      span {
        display: inline-block;
        transition: 0.2s linear;
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
