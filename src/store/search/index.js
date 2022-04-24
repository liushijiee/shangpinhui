import { reqGetSearchInfo } from "@/api";

const state={
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    async getSearchList(context,params={}){
        // params至少是个空对象
        let result=await reqGetSearchInfo(params);
        //console.log(result);
        if(result.code==200){
            context.commit("GETSEARCHLIST",result.data)
        }
    }
}
// getters用于计算属性，主要作用是简化仓库中的数据
//getters没有划分模块，在root下，也就是在$store下
const getters={
    //这个state是这个home中的state，也就是searchList这个对象，而不是调用中的大的那个state
    goodsList(state){
        //return state.searchList.goodsList//这样写是有问题的，searchList可能为空(例如没网的时候拿不到数据)
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    }

}

export default {
    state,
    mutations,
    actions,
    getters,
}