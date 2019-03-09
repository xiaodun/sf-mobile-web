<style lang="less">
@import "./Localize-UI.less";

.Localize-footer-vue {
  font-size: 0;
  line-height: 40px;

  position: fixed;
  bottom: 0;

  display: flex;

  width: 100%;
  height: 40px;

  text-align: center;

  color: #333;
  background-image: linear-gradient(#fffefe, #dcdada);
  background-clip: padding-box;
  box-shadow: -1px 0 2px 1px #ddd;

  > .item {
    font-size: 12px;
    font-weight: 600;

    display: inline-block;

    box-sizing: border-box;
    width: 25%;

    cursor: pointer;
    user-select: none;
    transition: all 0.25s;

    text-shadow: 0 1px 0 #d8cdcd;

    flex-grow: 1;

    &.selected {
      color: #f3f3f3;
      background-image: linear-gradient(#636262, #292828);
      text-shadow: 1px 1px 0 #252525;
    }

    span {
      vertical-align: middle;
    }
  }
}
</style>
<template>
  <div class='Localize-footer-vue'>
    <vue-touch
      tag="div"
      class="item"
      :class="selectedIndex === index && 'selected'"
      v-for="(item ,index) in list"
      :key="index"
      @tap="tap($event,index)"
    >
      <span> {{ item}}</span>
    </vue-touch>

  </div>
</template>
<script>
export default {
  name: "Localize-footer_vue",
  data() {
    return {};
  },
  methods: {
    tap(event, argIndex) {
      if (this.selectedIndex !== argIndex) {
        this.$emit("tap", event, argIndex);
      }
    }
  },
  computed: {},
  mounted() {},
  props: {
    list: {
      type: Array,
      required: true
    },
    selectedIndex: {
      default: 0
    }
  }
};
</script>