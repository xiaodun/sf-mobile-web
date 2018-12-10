<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  width: 100%;
  height: 100%;
}

body {
  overflow-y: auto;

  background-color: #fff;

  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<template>
  <div id="app">
    <router-view>

    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },

  components: {},
  methods: {},
  mounted() {}
};
</script>



