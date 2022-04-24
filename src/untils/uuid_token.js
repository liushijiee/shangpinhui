import {v4 as uuidv4} from 'uuid'

export const getUUID=()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //若没有生成游客临时身份
        uuid_token=uuidv4()
        //并且存在本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}