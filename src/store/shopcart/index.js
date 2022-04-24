import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"
const state = {
    cartList: []

}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }

}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return Promise.resolve('成功')
        } else {
            return Promise.reject('失败')
        }
    },
    //删除全部勾选的产品,context中有dispatch,commit,getters,state
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCartListBySkuId', item.skuId)
                PromiseAll.push(promise)
            }
        }

        );

    },
    //修改购物车某个物品状态
    async UpdateCheckedByid({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return Promise.resolve('成功')
        } else {
            return Promise.reject('失败')
        }
    },
    updateAllCartChecked({ dispatch,state,getters }, isChecked) {
        let PromiseAll=[]
        state.cartList[0].cartInfoList.forEach(item => {
            
            let promise=dispatch('UpdateCheckedByid', { skuId: item.skuId, isChecked: isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }


}

const getters = {
    cartList(state) {
        return state.cartList[0] || []
    },
    //计算出来购物车数据

}
export default {
    state,
    mutations,
    actions,
    getters
}