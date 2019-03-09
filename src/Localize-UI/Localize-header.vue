<style lang="less">
@import './Localize-UI.less';

.Localize-header-vue {
  font-size: 0;
  line-height: @header-height;

  position: fixed;
  z-index: 100;
  top: 0;

  box-sizing: border-box;
  width: 100%;
  height: @header-height;
  padding-right: @header-padding-right;
  padding-left: 15px;

  user-select: none;

  color: #fff;
  background-color: #5a5a5a;

  .left-cell {
    font-size: 14px;

    display: inline-block;

    margin-right: 10px;
  }

  .right-cell {
    font-size: 14px;

    position: absolute;
    top: 50%;
    right: @header-padding-right;

    transform: translateY(-50%);
  }

   > * {
    font-size: 16px;

    vertical-align: middle;
  }
}

</style>
<template>
  <div class='Localize-header-vue'>
    <div class="left-cell">
      <slot name="left"></slot>
    </div>
    <span class="name">{{title}}</span>

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