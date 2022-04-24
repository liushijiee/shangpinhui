import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'//这是路由组件
import store from '@/store'
import TypeNav from '@/pages/Home/TypeNav'
import ListContainer from '@/pages/Home/ListContainer/'
import Pagination from '@/components/Pagination'
import {reqCategoryList} from '@/api'

import '@/mock/mockServe'//引入mockServe
import 'swiper/css/swiper.css'//全局引入样式
import * as API from '@/api'
import { Button, Select,MessageBox} from 'element-ui';
import VueLazyload from 'vue-lazyload'
import defaultImg from '../public/images/floor-1-1.png'
import myPlugins from '@/plugins/myPlugins'

import "@/plugins/validate"//不需要引入，因为在插件文件中已经use了，所以只需要import在全局运行就行
Vue.use(myPlugins,1,2,3)

Vue.use(VueLazyload,{
  //再在需要懒加载的图片上添加v-lazy这个自定义指令，用法：<img v-lazy=""> 用之前是<img :src="">
  loading:defaultImg
})

// reqCategoryList();
Vue.component(Button.name, Button);
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component('ListContainer',ListContainer)
Vue.component('Pagination',Pagination)
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert

new Vue({
  render: h => h(App),
  router,//注册路由，注册后，路由组件和非路由组件身上都有$route,$router属性
  store,//注册仓库，组件实例上会多一个$store属性
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
  //$route:获取路由信息【路径，query，params等】
  //$router:进行编程式导航时使用【push|replace】
}).$mount('#app')
