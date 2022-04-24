//对外暴露一个函数
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}