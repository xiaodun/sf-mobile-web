<style lang="less">
.Localize-pagecontainer-vue {
  position: relative;

  overflow: hidden;

  height: 100%;
}
</style>
<template>
  <div class='Localize-pagecontainer-vue'>

    <slot name="header"></slot>
    <div
      ref="pageWrapper"
      :style="{width:footerList.length * 100+'%'}"
    >

      <LocalizePage
        :index="index"
        @pan="pagePan"
        @panend="pagePanEnd"
        :key="index"
        :style="{marginLeft:index*100+'%'}"
        v-for="(item,index) in footerList"
      >

        <slot :name="'page-'+index"></slot>
      </LocalizePage>

    </div>
    <LocalizeFooter
      :selected-index="selectedIndex"
      :list="footerList"
      @tap="pageTap"
    ></LocalizeFooter>
  </div>
</template>
<script>
import LocalizeFooter from "@/Localize-UI/Localize-footer.vue";
import LocalizePage from "@/Localize-UI/Localize-page.vue";
const threshold = 100;
export default {
  name: "Localize-pagecontainer_vue",
  data() {
    return {};
  },
  methods: {
    pagePanEnd(event) {
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
        if (
          (this.selectedIndex === 0 && direction === 4) ||
          (this.selectedIndex === this.footerList.length - 1 && direction === 2)
        ) {
          //
        } else {
          console.log(event.deltaX);
          this.$refs.pageWrapper.style.marginLeft =
            -this.selectedIndex * widthWindow + event.deltaX + "px";
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
  components: {
    LocalizeFooter,
    LocalizePage
  },
  mounted() {},
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