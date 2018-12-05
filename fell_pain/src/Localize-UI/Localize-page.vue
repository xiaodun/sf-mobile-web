<style lang="less">
@import 'Localize-UI.less';

.Localize-page-vue {
  position: absolute;
  top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 1em;
  padding-top: @header-height + 5;
  padding-bottom: @bottom-height + 5;
}

</style>
<template>

  <vue-touch
    class='Localize-page-vue'
    tag="div"
    @pan="swipe"
    :options="{touchAction:'pan-y',direction:['left','right']  }"
  >

    <slot></slot>
  </vue-touch>

</template>
<script>
export default {
  name: "Localize-page_vue",
  data() {
    return {};
  },
  methods: {
    swipe(event) {
      console.log(event);
      this.$emit("swipe", event);
    }
  },
  computed: {},
  mounted() {},
  props: {
    index: {
      type: Number
    }
  }
};
</script>