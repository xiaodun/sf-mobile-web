<style lang="less">
.Localize-card {
  clear: both;

  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 5px;

  background-color: #fff;

  &:after {
    display: block;
    clear: both;

    content: '';
  }

  .first {
    font-size: 0;

    padding: 8px 0;

    border-bottom: 1px solid #f4f4f4;
    &:after {
      display: block;
      clear: both;

      content: '';
    }
  }

  .icon {
    display: inline-block;

    vertical-align: middle;
  }

  .title {
    font-size: 16px;
    font-weight: 400;

    display: inline-block;

    margin-left: 10px;

    vertical-align: middle;

    color: #434343;
  }

  .content {
    font-size: 14px;

    clear: both;

    margin: 10px 0;

    color: #456;

     > p {
      margin-bottom: 8px;
    }

     > .item {
      margin-bottom: 4px;
    }
  }

  .line {
    height: 10px;

    border-radius: 5px;
    background-color: rgb(246, 246, 246);
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
