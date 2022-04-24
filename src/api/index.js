//在这个模块：进行API的统一管理
import requests from './requests'
import mockRequest from './mockAjax'

//三级联动接口
//发请求：axios发请求返回结果是Promise对象
export const reqCategoryList=()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

export const reqGetBannerList=()=>mockRequest.get(`/banner`)

export const reqGetFloorList=()=>mockRequest.get(`/floor`)

//获取搜索的信息，至少需要一个空对象，在vuex中体现
export const reqGetSearchInfo = (params) =>requests({
    url:'/list',
    method:'post',
    data:params,
})

// 产品详情页信息
export const reqGoodsInfo=(skuId)=>requests.get(`/item/${skuId}`)

//产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdataShopCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post',
    
})

//获取购物车列表数据接口
export const reqCartList=()=>requests.get(`/cart/cartList`)

//删除一条购物车
export const reqDeleteCartById=(skuId)=>requests.delete(`/cart/deleteCart/${skuId}`)
//修改商品的选中状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

//获取验证码
export const reqGetCode=(phone)=>requests.get(`/user/passport/sendCode/${phone}`)

//注册用户
export const reqUserRegister=(data)=>requests({
    url:'/user/passport/register',
    data,
    method:'post'
})
//请求登录
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    data:data,
    method:'post'
})

//获取用户信息【需要带着token向服务器请求用户信息】但是请求地址没有给接口带token，要在请求头中带token
export const reqUserInfo=()=>requests.get(`/user/passport/auth/getUserInfo`)

export const reqLogout=()=>requests.get(`/user/passport/logout`)

export const reqAddressInfo=()=>requests.get(`/user/userAddress/auth/findUserAddressList`)

export const reqOrderInfo=()=>requests.get(`/order/auth/trade`)

//提交订单接口(这个在trade组件点击提交订单时候直接调用，不在vuex里存数据,在mian.js中给Vue的原型上注册一个$API)
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data:data,
    method:'post'
})

//获取订单支付信息
export const reqPayInfo=(orderId)=>requests.get(`/payment/weixin/createNative/${orderId}`)

//获取支付状态
export const reqPaystatus=(orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

//获取个人中心的数据（订单）
export const reqMyOrderList=(page,limit)=>requests.get(`/order/auth/${page}/${limit}`)