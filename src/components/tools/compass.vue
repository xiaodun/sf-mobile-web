<style lang="less">
#compass-vue-id {
  .compass-wrapper {
    height: 600px;
    position: relative;
    transform-origin: 50% 50%;
    padding: 0 100px;
    img {
      top: 0;
      transition: all 0.25s;
      left: 0;
      position: absolute;

      max-width: 80%;
      margin: 0 10%;
    }
  }
}
</style>
<template>
  <div id='compass-vue-id'>
    <div class="describe">
      <a
        target="_blank"
        href="https://blog.csdn.net/weixin_39644462/article/details/81126952"
      >跳转到参考博客</a>
    </div>
    <div v-text="alpha"></div>
    <div
      ref="compassDom"
      class="compass-wrapper"
    >
      <img
        src="/static/compass/tray.png"
        alt="托盘"
      >
      <img
        ref="dialDom"
        src="/static/compass/dial.png"
        alt="表盘"
      >
      <img
        src="/static/compass/needle.png"
        alt="指针"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "compass_vue",
  data() {
    return {
      alpha: ""
    };
  },
  methods: {
    deviceorientation(event) {
      this.$refs.dialDom.style.transform =
        "rotate(-" + (360 - event.alpha) + "deg)";
    }
  },
  computed: {},
  mounted() {
    window.addEventListener(
      "deviceorientationabsolute",
      this.deviceorientation
    );
  },
  beforeDestroy() {
    window.removeEventListener(
      "deviceorientationabsolute",
      this.deviceorientation
    );
  }
};
</script>