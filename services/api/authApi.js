import {api, BASE_URL} from "./api";
import {endPoints} from "./endPoints";
import axios from "axios";

export const authApi = axios.create({
    baseURL: BASE_URL,
})

export const loginApi=async(data)=>{
    return await authApi.post(endPoints.auth.login,data).then(({data})=>Promise.resolve(data)).catch(e=>Promise.reject(e));
}