import { reqAddOrUpdataShopCart, reqGoodsInfo } from "@/api"
import  {getUUID} from '@/untils/uuid_token'

const state={
    goodInfo:{},
    uuid_token:getUUID(),
}
const mutations={
    GETGOODINFO(state,goodInfo){
        
        state.goodInfo=goodInfo
    }
}
const actions={
    //获取产品信息
    async getGoodInfo({commit},skuId){ 
        let result=await reqGoodsInfo(skuId)
        //console.log(result)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },

    //将产品添加到购物车中
    async addOrUpdataShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdataShopCart(skuId,skuNum)
        if(result.code==200){
            return new Promise((resolve,reject)=>{
                resolve('成功')
            })
        }else{
            return new Promise((resolve,reject)=>{
                reject('加入失败')
            })
            }
        }
        
    }

const getters={
    goodInfo(state){

        return state.goodInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}