import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"

const state={
    //服务器返回的是数组，那初始值就要写空数组
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    FLOORLIST(state,floorList){
        //console.log('执行mutation');
        state.floorList=floorList
    }
}
const actions={
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList(context){
        let r=await reqCategoryList();
        //console.log(r);
        if(r.code==200){
            context.commit("CATEGORYLIST",r.data)
        }
    },
    async bannerList(context){
        let r=await reqGetBannerList();
        //console.log(r);
        if(r.code==200){
            context.commit("BANNERLIST",r.data)
        }
    },
    async floorList(context){
        //console.log('执行action');
        let r=await reqGetFloorList();
        //console.log(r);
        if(r.code==200){
            context.commit("FLOORLIST",r.data)
        }
    }
}
const getters={

}
export default {
    state,
    mutations,
    actions,
    getters,
}