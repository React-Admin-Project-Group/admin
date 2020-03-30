import axios from 'axios'
import getToken from './getToken'
axios.interceptors.request.use(function (config) {
  const loginInfo = getToken()
  let token = ''
  if (loginInfo) {
    token = loginInfo.token || 'no token'
  } else {
    token = 'no token'
    // 检测到未登录
  }
  
  config.headers.authorization = 'Bearer ' + token
  console.log('添加请求头')
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axios