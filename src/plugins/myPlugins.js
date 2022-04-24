//vue插件一定暴露一个对象，并且一定调用install方法
let myPlugins={};

myPlugins.install=function(Vue,x,y,z){
    
};
export default myPlugins;
//再在全局引入自定义组件