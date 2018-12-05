<style lang="less">
@import './Localize-UI.less';

.Localize-dropmenu-vue {
  position: relative;

  .header {
    cursor: pointer;

    .iconfont {
      height: @header-height;
    }
  }

  .menu {
    line-height: 40px;

    position: absolute;
    right: 0;

    width: 170px;

    background-color: #444;

    .item {
      cursor: pointer;

      border-bottom: 1px solid #afafaf;

      .iconfont {
        margin-right: 10px;
        margin-left: 15px;
      }
    }
  }
}

</style>
<template>
  <div class='Localize-dropmenu-vue'>
    <div
      @touchstart="toggle_menu()"
      class="header"
    >

      <slot name="header">
        <i class="iconfont icon-gengduo"></i>
      </slot>
    </div>
    <div
      class="menu"
      v-show="isShowMenu"
    >
      <slot name="menu">

        <div
          @touchstart="tap_menu_item(item,index)"
          class="item"
          :key="index"
          v-for="(item,index) in menuItem"
        >
          <template v-if="item.icon">
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
            <span>{{item.content}}</span>
          </template>
          <template v-else>
            <span>{{item.content}}</span>
          </template>
        </div>

      </slot>
    </div>
  </div>
</template>
<script>
import LocalizeIconfont from "./Localize-iconfont.vue";
export default {
  name: "Localize-dropmenu_vue",
  data() {
    return {
      isShowMenu: false
    };
  },
  methods: {
    toggle_menu() {
      this.isShowMenu = !this.isShowMenu;
    },
    tap_menu_item(argItem, argIndex) {
      let obj = JSON.parse(JSON.stringify(argItem));
      this.$emit("tap-item", obj, argIndex);
      this.isShowMenu = false;
    }
  },
  computed: {},
  mounted() {
    document.addEventListener(
      "touchstart",
      () => {
        this.isShowMenu = false;
      },
      true
    );
  },
  props: {
    iconType: {
      default: "ios-add"
    },
    menuItem: {
      type: Array
    }
  },
  components: {
    LocalizeIconfont
  }
};
</script>