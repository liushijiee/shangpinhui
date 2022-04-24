//对axios二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象的create方法，去创建axios实例，mockRequest实际上就是axios
const mockRequest=axios.create({
    baseURL:'/mock',//发请求时候路径当中会出现/api
    timeout:5000,//代表请求超过时间5s

})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
mockRequest.interceptors.request.use((config)=>{
    nprogress.start();
    //config：配置对象，对象里面有一个属性很重要，header请求头
    return config;
})
//响应拦截器
mockRequest.interceptors.response.use((res)=>{
    //成功的回调函数
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))

})
export default mockRequest;