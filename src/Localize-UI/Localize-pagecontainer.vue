<style lang="less">
.Localize-pagecontainer-vue {
  position: relative;

  overflow: hidden;

  height: 100%;

  .page-wrapper {
    transition: 0.25s ease-in;
  }
}
</style>
<template>
  <div class='Localize-pagecontainer-vue'>

    <slot name="header"></slot>
    <div
      class="page-wrapper"
      ref="pageWrapper"
      :style="{width:footerList.length * 100+'%'}"
    >

      <slot></slot>

    </div>
    <LocalizeFooter
      :selected-index="selectedIndex"
      :list="footerList"
      @tap="pageTap"
    ></LocalizeFooter>
  </div>
</template>
<script>
const threshold = 100;
const minNumber = 3;
// 最小的触发次数   在Chrome 70.0.3538.110 中快速滑动倒面底部会造成页面的切换
export default {
  name: "Localize-pagecontainer_vue",
  data() {
    return {
      number: 0
    };
  },
  methods: {
    panStart() {
      this.number = 0;
    },
    pagePanEnd(event) {
      this.number = 0;
      if (Math.abs(event.deltaX) <= threshold) {
        this.$refs.pageWrapper.style.marginLeft =
          -this.selectedIndex * 100 + "%";
      }
    },
    pagePan(event, argIndex) {
      let direction = event.direction;
      let widthWindow = window.innerWidth;
      if (direction === 2 || direction === 4) {
        //左右滑动
        this.number++;
        if (this.number < minNumber) {
          return;
        }
        if (
          (this.selectedIndex === 0 && direction === 4) ||
          (this.selectedIndex === this.footerList.length - 1 && direction === 2)
        ) {
          //
        } else {
          this.$refs.pageWrapper.style.marginLeft =
            -this.selectedIndex * widthWindow + event.deltaX + "px";
          //大于阀值切换页面

          if (Math.abs(event.deltaX) > threshold) {
            this.$refs.pageWrapper.style.marginLeft =
              direction === 2
                ? -(this.selectedIndex + 1) * 100 + "%"
                : -(this.selectedIndex - 1) * 100 + "%";
            this.$emit(
              "change-page",
              direction === 2 ? this.selectedIndex + 1 : this.selectedIndex - 1
            );
          }
        }
      }
    },
    pageTap(event, argIndex) {
      this.$refs.pageWrapper.style.marginLeft = -argIndex * 100 + "%";

      this.$emit("change-page", argIndex);
    }
  },
  computed: {},

  mounted() {
    //初始化每个页面   暂不考虑动态添加页面的情况
    let pageList = this.$slots.default.filter((Vnode, index, arr) => {
      return Vnode.tag !== undefined;
    });
    pageList.forEach((Vnode, index, arr) => {
      Vnode.index = index;
      Vnode.elm.style.marginLeft = index * 100 + "%";
    });
  },
  props: {
    footerList: {
      required: true,
      type: Array
    },
    selectedIndex: {
      default: 0,
      type: Number
    }
  }
};
</script>