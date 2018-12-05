<style lang="less">
@import "./Localize-UI.less";

.Localize-header-vue {
  line-height: @header-height;
  user-select: none;
  position: fixed;
  z-index: 100;

  box-sizing: border-box;
  width: 100%;
  height: @header-height;
  padding-right: 25px;
  padding-left: @header-padding-right;

  color: #fff;
  background-color: #5a5a5a;

  .right-cell {
    position: absolute;
    top: 50%;
    right: @header-padding-right;

    transform: translateY(-50%);
  }
}
</style>
<template>
  <div class='Localize-header-vue'>
    {{title}}
    <div class="right-cell">

      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Localize-header_vue",
  data() {
    return {};
  },
  props: {
    title: {
      required: true,
      type: String
    }
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>