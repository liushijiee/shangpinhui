import { reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout } from "@/api"
import {setToken} from '@/untils/token'
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    USERLOGOUT(state){
        state.userInfo={}
        state.token=''
    }
}
const actions={
    async getCode({commit},phone){
        let result =await reqGetCode(phone)
        
        if(result.code==200){
            commit('GETCODE',result.data)
            return Promise.resolve('成功')
        }
    },
    async userRegister({commit},user){
        let result =await reqUserRegister(user)
        if(result.code==200){

        }else{
            return Promise.reject('该用户名已被注册')
        }
    },
    async userLogin({commit},data){
        let result =await reqUserLogin(data)
        console.log(result);
        if(result.code==200){
            localStorage.setItem('TOKEN',result.data.token)
            commit('USERLOGIN',result.data.token)
        }else{
            return Promise.reject('该用户不存在')
        }
    },
    async getUserInfo({commit}){
        let result =await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 1
        }
        else{
            return Promise.reject(new Error(error))
        }
    },
    async userLogout({commit}){
        let result =await reqLogout()//通知服务器清楚token
        localStorage.removeItem('TOKEN')
        if(result.code==200){
            commit('USERLOGOUT')
            return 1
        }else{
            return Promise.reject('失败')
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters,
}