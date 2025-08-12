import {useMutation} from "@tanstack/react-query";
import {loginApi, logoutApi} from "@/services/api/authApi";
import {useAuthStore} from "@/store/useAuthStore";
import {deleteLoginData, saveLoginData} from "@/services/tokenService";
import {reload} from "expo-router/build/global-state/routing";
import {reloadAppAsync} from "expo";
import {useRouter} from "expo-router";


export function AuthMutation() {
    const {setIsLogin} = useAuthStore()

    const route = useRouter()

    return useMutation({
        mutationFn: (data) => loginApi(data), onSuccess:async (data) => {
            const {accessToken, deviceId, refreshToken} = data || {
                accessToken: null,
                deviceId: null,
                refreshToken: null
            }

          await  saveLoginData({accessToken, deviceId, refreshToken})
            route.replace('/')

            setIsLogin(true)

        }, onError: (err) => {
            console.log(err)
        }


    },)

}


export function Logout() {
    const {setIsLogin} = useAuthStore()
    const route = useRouter()


    return useMutation({
        mutationFn: logoutApi, onSuccess: async (data) => {
            console.log(data)
            setIsLogin(false)

            await deleteLoginData()
            route.replace('/login')


        }, onError: (err) => {
            console.log(err)
        }


    },)

}




