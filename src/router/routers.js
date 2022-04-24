//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

const foo=()=>{
    return  import('@/pages/Home')
}

export default [
    {
        path:'/center',
        component:()=>import('@/pages/Center'),//路由懒加载简写方法
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            }
        ]

    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/pay',
        component:Pay,
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/trade',
        component:Trade,
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false)//回到from路由
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/detail/:skuId?",
        component:Detail,
        meta:{show:true}
    },
    {
        path: "/home",
        component:foo,
        meta:{show:true}
    },
    
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        path: "/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:'search',
        //props:true,//可以传递，但是接收时候只能接收一个,只能传递params
        //props:['true','false']//错误
        //props:{keyword:true,k:1}
        props:($route)=>{
            return {keyword:$route.params.keyword,
                    k:$route.query.k}
        }//将params和query当作参数传递给了search组件
    },
    //重定向
    {
        path:'/',
        redirect:"/home"
    }



]