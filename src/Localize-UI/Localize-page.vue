<style lang="less">
@import "~@/Localize-UI/Localize-UI.less";

.Localize-page-vue {
  position: absolute;
  top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 1em;
  padding-top: 5px;
  padding-bottom: @bottom-height + 5;
}
</style>
<template>

  <vue-touch
    class='Localize-page-vue'
    tag="div"
    @panstart="on_pan_start"
    @pan="pan"
    @panend="pan_end"
    :options="{touchAction:'pan-y' }"
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
    on_pan_start(event) {
      this.$parent.panStart(event);
    },
    pan(event) {
      this.$parent.pagePan(event);
    },
    pan_end(event) {
      this.$parent.pagePanEnd(event);
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