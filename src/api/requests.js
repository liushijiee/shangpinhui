//对axios二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';

import store from '@/store';
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象的create方法，去创建axios实例，request实际上就是axios
const requests=axios.create({
    baseURL:'/api',//发请求时候路径当中会出现/api,vue自动补齐http://localhost：端口
    timeout:5000,//代表请求超过时间5s

})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    if(store.state.detail.uuid_token){
        //请求头添加一个字段:工作中要和后台人员协商名字(这里的是userTempId)
        config.headers.userTempId=store.state.detail.uuid_token
    }
    nprogress.start();
    //config：配置对象，对象里面有一个属性很重要，header请求头
    return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))

})
export default requests;