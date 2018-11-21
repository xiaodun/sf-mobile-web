<style lang="less">
.Localize-upload {
  input {
    display: none;
  }
  .upload-btn {
    cursor: pointer;
    width: 170px;
    height: 36px;
    border-radius: 20px;
    border: 1px dotted rgb(48, 162, 228);
    background-color: #fff;
    color: rgb(75, 73, 73);
    letter-spacing: 2px;
    &:focus {
      outline: none;
    }
    margin: 20px;
  }
  .progress-item {
    margin-bottom: 10px;
  }
}
</style>
<template>
  <div class='Localize-upload' ref='uploadDom'>
    <button class='upload-btn' @click="upload">文件上传</button>
    <LocalizeProgress v-for="(item,index) in progressList" :key="index" class="progress-item" :value="item.value"></LocalizeProgress>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import AxiosHelper from "@/assets/lib/AxiosHelper";
import LocalizeProgress from "@/Localize-UI/Localize-progress";
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
      let formData = new FormData();
      for (let i = 0; i < event.target.files.length; i++) {
        let el = event.target.files[0];
        formData.append("files", el);
      }
      event.target.value = "";
      this.progressList.push({
        formData: formData,
        value: 0
      });
      this.request_upload_file(formData);
    };
  },
  methods: {
    upload() {
      this.inputDom.click();
    },
    request_upload_file(argFormdata) {
      AxiosHelper.request({
        method: "post",
        url: this.uri,
        data: argFormdata,
        headers: {
          "Content-type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          var complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;

          let index = this.progressList.findIndex((el, index, arr) => {
            return el.formData == argFormdata;
          });
          this.progressList[index].value = complete;
          if (complete == 100) {
            Toast("上传成功");
            this.progressList.splice(index, 1);
            this.$emit("success");
          }
        }
      }).then(response => {});
    }
  },
  props: {
    uri: {
      type: String,
      require: true
    },
    accept: {
      type: String
    },
    inputId: {
      type: String,
      require: true
    },
    multiple: {
      // type: Boolean,
      default: false
    }
  },
  components: {
    LocalizeProgress
  }
};
</script>