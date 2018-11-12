<style lang="less">
.Localize-card {
  box-sizing: border-box;
  padding-left: 5px;
  width: 100%;
  background-color: #fff;
  clear: both;
  margin-top: 10px;
  margin-bottom: 15px;
  &:after {
    display: block;
    clear: both;
    content: "";
  }
  .first {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    padding: 8px 0;
    font-size: 0px;
    border-bottom: 1px solid #f4f4f4;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
  .title {
    vertical-align: middle;
    font-size: 16px;
    font-weight: 400;
    display: inline-block;
    margin-left: 10px;
    color: #434343;
  }
  .content {
    clear: both;
    margin: 10px 0;

    font-size: 14px;
    color: #456;
    > p {
      margin-bottom: 8px;
    }
    > .item {
      margin-bottom: 4px;
    }
  }
  .line {
    background-color: rgb(246, 246, 246);
    height: 10px;

    border-radius: 5px;
  }
}
</style>
<template>
  <div class='Localize-card'>
    <div class="first">
      <div class="icon">

        <slot name='icon'></slot>
      </div>
      <div class="title">

        <slot name='title'></slot>
      </div>
    </div>

    <div class="content">

      <slot name='content'></slot>
    </div>
    <div class="line"></div>

  </div>
</template>
<script>
export default {
  name: "Localize-card_vue",
  data() {
    return {};
  },

  methods: {},
  computed: {},
  mounted() {},
  components: {}
};
</script>