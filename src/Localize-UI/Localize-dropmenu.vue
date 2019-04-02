<style lang="less">
@import './Localize-UI.less';

.Localize-dropmenu-vue {
  position: relative;

  .header {
    padding: 0 10px;

    cursor: pointer;
    transition: all linear .35s;

    &:active {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  .menu {
    line-height: 40px;

    position: absolute;
    right: 0;

    width: 170px;
    margin-top: 4px;

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
  <div ref="dropmenu" class="Localize-dropmenu-vue">
    <vue-touch @tap="toggle_menu($event)" class="header">
      <slot name="header">
        <div class="iconfont icon-gengduo"></div>
      </slot>
    </vue-touch>
    <div class="menu" v-show="isShowMenu">
      <slot name="menu">
        <div
          @touchstart="tap_menu_item(item,index,$event)"
          class="item"
          :key="index"
          v-for="(item,index) in menuItem"
        >
          <template v-if="item.icon">
            <i class="iconfont" :class="item.icon"></i>
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
    },
    hide_menu(event) {
      let target = event.target;
      if (
        target === this.$refs.dropmenu ||
        (this.$refs.dropmenu.compareDocumentPosition(target) & 16) === 16
      ) {
        //
      } else {
        this.isShowMenu = false;
      }
    }
  },
  computed: {},
  mounted() {
    document.addEventListener("touchstart", this.hide_menu, true);
  },
  beforeDestroy() {
    document.removeEventListener("touchstart", this.hide_menu);
  },
  props: {
    iconType: {
      default: "ios-add"
    },
    menuItem: {
      type: Array
    }
  }
};
</script>