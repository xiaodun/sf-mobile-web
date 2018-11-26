import axios from 'axios';
import builtService from '@root/service/app/config.json';
import {Toast} from 'Mint-ui';
var instance = axios.create({
  baseURL: '/' + builtService.prefix,
});
// instance.interceptors.request.use(function(){

// })
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  (error, response) => {
    if (error.response.status === 504) {
      //没有开启内置服务器
      Toast('请开启内置的服务器');
    }
  }
);

class Helper {
  request(options) {
    return instance(options);
  }
}
var helper = new Helper();

export default helper;
