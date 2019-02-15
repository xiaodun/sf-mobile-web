import axios from "axios";
import builtService from "@root/service/app/config.json";
import { Toast } from "mint-ui";
import Vue from "vue";
var instance = axios.create({
  baseURL: "/" + builtService.prefix
});
// instance.interceptors.request.use(function(){

// })
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  (error, response) => {
    if (error.response && error.response.status === 504) {
      //没有开启内置服务器
      Toast("请开启内置的服务器");
    } else {
      Toast("发生错误");
      console.error(error);
    }
  }
);

class Helper {
  request(options) {
    return instance(options);
  }
}
var helper = new Helper();

Vue.prototype.$axios = helper;
export default helper;
