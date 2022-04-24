//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
Vue.use(VueRouter)



// 先把VueRouter.prototype中的push保存
let originPush= VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;//和push同理

//重写push
// push的上下文就是VueRouter的实例对象：this.$router
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }
    else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }
    else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

let router= new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
// 全局前置守卫，所有跳转都会触发
router.beforeEach(async (to,from,next)=>{
    //to:可以跳转到哪个的路由目的地
    //from:从哪个路由开始跳转
    //next：放行函数 next()放行  next(path)放行到指定路由 next(false)退回到from的路由地址
    let token= store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        if(to.path=='/login'){
            next('/home')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login')
                }
                
            }
        }
    }else{
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1 ||toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1){
            // 在没登陆时候点击的地方再登录后直接跳转
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
    }
})
export default router