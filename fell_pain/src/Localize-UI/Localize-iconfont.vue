<style lang="less">
.Localize-iconfont {
  display: block;
}
</style>
<template>

    <svg class="icon Localize-iconfont" :size='initialSize' :width='width' :height="height" aria-hidden="true">
        <use :xlink:href="'#'+icon"></use>
    </svg>

</template>
<script>
export default {
  name: "Localize-iconfont_vue",
  data() {
    return {
      width: "12px",
      height: "12px"
    };
  },
  props: {
    icon: {
      type: String,
      require: true
    },
    size: {
      type: String
    }
  },
  methods: {},
  computed: {
    initialSize() {
      if (this.size !== undefined) {
        if (this.size === "larger") {
          this.width = "24px";
          this.height = "24px";
        } else if (this.size.indexOf(",") !== -1) {
          this.width = this.size.split(",")[0];
          this.height = this.size.split(",")[1];
        } else {
          //传入单个值
          this.width = this.size;
          console.log(this.size);
          this.height = this.size;
        }
      }
      return "";
    }
  },
  mounted() {}
};
</script>