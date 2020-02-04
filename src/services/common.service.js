import axios from 'axios';
import { message } from 'antd';
import crypto from 'crypto';

function pad2(n) { return n < 10 ? `0${n}` : n; }
// md5加密
function getSign(token, time) {
  const md = crypto.createHash('md5');
  let code = `appId=${token}&timespan=${time}&key=dfadjslkajfiojdklasfjidosaufoiweqkjfdsakjlfhdjklsa`;
  md.update(code);
  const sign = md.digest('hex');
  return sign;
}
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
axios.interceptors.request.use((config) => {
  const config1 = config;
  const token = localStorage.getItem('token');
  if (token) {
    let date = new Date();
    let time = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
    config1.headers.Authorization = token;
    config1.headers.timespan = time;
    config1.headers.sign = getSign(token, time);
  }
  return config1;
}, (error) => Promise.reject(error));
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
axios.interceptors.response.use((response) => {
  const responseCode = response.status;
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
}, (error) => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = '';
  switch (responseCode) {
    // 401：未登录
    case 401:
      // 跳转登录页
      window.location.href = '/login';
      break;
    // 403: token过期
    case 403:
      // 弹出错误信息
      message.error('登录已过期，正在跳转至登录页...');
      // 清除token
      localStorage.removeItem('token');
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      console.log('error:网络请求不存在');
      break;
    // 其他错误，直接抛出错误提示
    default:
      console.log(`error request status ${responseCode}.`);
  }
  return Promise.reject(error);
});

export default function handleService(url, data, method = 'GET') {
  if (method === 'GET') {
    return axios({
      url,
      params: data,
      method
    });
  }
  return axios({
    url,
    data,
    method
  });
}
