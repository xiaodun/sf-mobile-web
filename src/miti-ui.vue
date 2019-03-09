<style lang="less">
@width: 400px;
#miti-ui-vue-id {
  #qrcode-id {
    display: block;

    transition: none;
    text-align: left;
  }

  #mint-ui-id {
    position: fixed;

    display: block;

    width: @width;
    height: 100%;
    margin-left: 10px;

    border-left: 1px solid #ccc;
  }

  .main-wrapper {
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: @width + 20px;

    border-left: 1px solid #ccc;
  }

  @media screen and (max-width: 640px) {
    #mint-ui-id {
      display: none;
    }

    .main-wrapper {
      padding-left: 0px;
    }

    #qrcode-id {
      display: none;
    }
  }
}
</style>
<template>

  <div id="miti-ui-vue-id">
    <iframe id="mint-ui-id" src="https://mint-ui.github.io/docs/#/zh-cn2/checklist" frameborder="0"></iframe>
    <div class="main-wrapper">

      <div class="practice">
      </div>
    </div>
  </div>
</template>

<script>
import MintUI from 'mint-ui';

export default {
  name: 'Practice',
  data() {
    return {
      value: [],
      email: '21',
    };
  },

  methods: {},
  mounted() {},
};
</script>


