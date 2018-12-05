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
        @swipe="pageSwipe"
        :key="index"
        :style="{marginLeft:index*100+'%'}"
        v-for="(item,index) in footerList"
      >

        <slot :name="'page-'+index"></slot>
      </LocalizePage>

    </div>
    <LocalizeFooter :list="footerList"></LocalizeFooter>
  </div>
</template>
<script>
import LocalizeFooter from "@/Localize-UI/Localize-footer.vue";
import LocalizePage from "@/Localize-UI/Localize-page.vue";
export default {
  name: "Localize-pagecontainer_vue",
  data() {
    return {};
  },
  methods: {
    pageSwipe(event, argIndex) {
      let direction = event.direction;
      console.log(event);
      if (direction === 2 || direction === 4) {
        this.$refs.pageWrapper.style.marginLeft = event.deltaX + "px";
      }
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