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
  <div class="Localize-upload" ref="uploadDom">
    <button class="upload-btn" @click="upload">文件上传</button>
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
    if (Boolean(this.capture)) {
      this.inputDom.capture = this.capture;
    }

    this.inputDom.multiple = this.multiple !== false && true;
    this.$refs.uploadDom.appendChild(this.inputDom);
    this.inputDom.onchange = event => {
      let formData = new FormData();
      for (let i = 0; i < event.target.files.length; i++) {
        let el = event.target.files[i];
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
      this.$axios
        .request({
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
        })
        .then(response => {});
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
    capture: String,
    multiple: {
      // type: Boolean,
      default: false
    }
  }
};
</script>