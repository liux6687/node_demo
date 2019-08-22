import axios from 'axios'
import { Message, Loading } from 'element-ui'
import QS from 'qs'
import router from '@/router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //定义默认请求地址
  withCredentials: true, // 跨域请求时携带cookie
  timeout: 100000, //请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 对请求做一些处理
    let token = window.sessionStorage.getItem("token");
    let token_type = window.sessionStorage.getItem("token_type");
    if(token) {
      config.headers['Authorization'] = `${token_type} ${token}`;
    }
    return config

  },
  error => {
    //   对请求发生错误的处理
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const loading = Loading.service({ fullscreen: true });
    let res = error.response;
    Message({
      message: res.data.message,
      type: 'error',
      duration: 2 * 1000,
      showClose: true,
      onClose() {
        if(res.status === 401) {
          window.sessionStorage.clear();
          router.push({
            path: '/login'
          })
        }
      }
    })
    loading.close();
    return Promise.reject(error)
  }
)
// 封装get方法
function get(url, params, obj){
    return new Promise((resolve, reject) =>{
        service.get(url, {params}, obj).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    });
}
// 封装post方法
function post(url, params, obj){
    return new Promise((resolve, reject) =>{
        service.post(url, QS.stringify(params), obj).then(res =>{
            resolve(res.data);
        }).catch(err =>{
            reject(err.data);
        })
    });
}

// 封装put方法
function put(url, params){
  return new Promise((resolve, reject) =>{
      service.put(url, params).then(res =>{
          resolve(res.data);
      }).catch(err =>{
          reject(err.data);
      })
  });
}
// 封装delete方法
function is_delete(url, params) {
  return new Promise((resolve, reject) =>{
    service.delete(url, params).then(res =>{
        resolve(res.data);
    }).catch(err =>{
        reject(err.data);
    })
});
}
//向外暴露request 方法
export function request(method, url, params, obj = {}){
    if(method == 'GET'){
        return get(url, params, obj);
    }else if(method == 'POST'){
        return post(url, params, obj);
    }else if(method == 'PUT') {
      return put(url, params);
    }else if(method == 'DELETE') {
      return is_delete(url, params);
    }
}
