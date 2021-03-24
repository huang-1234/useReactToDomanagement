/* 能发送 ajax 请求的函数模块 
 *包装 axios 
 *函数的返回值是 promise 对象 
 *axios.get()/post()返回的就是 promise 对象 
 *返回自己创建的 promise 对象: 
    统一处理请求异常 
    异步返回结果数据, 而不是包含结果数据的 response 
 */
import axios from "axios";
import {message} from 'antd'

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      //配置对象
      // 发送get请求
      promise = axios.get(url, {
        params: data,
      });
    } else {  // 发送POST请求
      promise = axios.post(url, data);
    }
    // 2.请求成功，调用resolve
    promise.then(response => {
      resolve(response.data);
      // 3. if失败了，不调用reject(reson)提示失败信息
    }).catch(error => {
      message.error('请求出错了'+error.message);
    })
  });

  // 统一处理请求异常
}
// 请求登录接口
ajax('/login',{username:'Tom',password:1234},'POST').then()
// 添加用户
ajax('/manage/user/add',{username:'Tom',password:1234,phone:18569631923},'POST').then()
