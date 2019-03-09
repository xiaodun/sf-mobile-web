<style lang="less">
.Localize-upload {
  input {
    display: none;
  }

  .upload-btn {
    width: 170px;
    height: 36px;
    margin: 20px;

    cursor: pointer;
    letter-spacing: 2px;

    color: rgb(75, 73, 73);
    border: 1px dotted rgb(48, 162, 228);
    border-radius: 20px;
    background-color: #fff;

    &:focus {
      outline: none;
    }
  }

  .progress-item {
    margin-bottom: 10px;
  }
}

</style>
<template>
  <div
    class='Localize-upload'
    ref='uploadDom'
  >
    <button
      class='upload-btn'
      @click="upload"
    >读取本地文件</button>
    <LocalizeProgress
      v-for="(item,index) in progressList"
      :key="index"
      class="progress-item"
      :value="item.value"
    ></LocalizeProgress>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "Localize-upload_vue",
  data() {
    return {
      process: 0,
      progressList: []
    };
  },
  computed: {},
  mounted() {
    this.inputDom = document.createElement(`input`);
    this.inputDom.accept = this.accept;
    this.inputDom.type = "file";
    this.inputDom.multiple = this.multiple !== false && true;

    this.$refs.uploadDom.appendChild(this.inputDom);
    this.inputDom.onchange = event => {
      Toast("已添加到列表");
      for (let i = 0; i < event.target.files.length; i++) {
        let el = event.target.files[i];

        this.$emit("success", el);
      }
      event.target.value = "";
    };
  },
  methods: {
    upload() {
      this.inputDom.click();
    }
  },
  props: {
    accept: {
      type: String
    },
    multiple: {
      // type: Boolean,
      default: false
    }
  }
};
</script>