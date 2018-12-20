<style lang="less">
#compass-vue-id {
  color: #000;
}

</style>
<template>
  <div id='compass-vue-id'>
    {{alpha}}
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
      this.alpha = event.alpha + "";
      console.log(event.alpha);
    }
  },
  computed: {},
  mounted() {
    window.addEventListener("deviceorientation", this.deviceorientation);
  },
  beforeDestroy() {
    window.removeEventListener("deviceorientation", this.deviceorientation);
  }
};
</script>