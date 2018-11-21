<style lang="less">
.Localize-progress {
  display: table;
  .progress {
    transform: translateY(7px);
    border-top: 4px solid rgb(135, 245, 212);
    display: table-cell;
    // transition: width 0.25s ease-in-out;
  }
  .value {
    margin: 0 5px;
    font-size: 16px;
  }
}
</style>
<template>
  <div class='Localize-progress'>
    <div :style="{width:value+'%'}" class='progress'></div>
    <div class="value">{{value}}%</div>
  </div>
</template>
<script>
export default {
  name: "Localize-progress_vue",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
  props: {
    value: {
      type: Number,
      required: true
    }
  }
};
</script>