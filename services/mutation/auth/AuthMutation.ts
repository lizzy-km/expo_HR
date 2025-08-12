import {useMutation} from "@tanstack/react-query";
import {loginApi, logoutApi} from "@/services/api/authApi";
import {useAuthStore} from "@/store/useAuthStore";
import {deleteLoginData, saveLoginData} from "@/services/tokenService";


export function AuthMutation() {
    const {setIsLogin} = useAuthStore()


    return useMutation({
        mutationFn: (data) => loginApi(data), onSuccess: (data) => {
            const {accessToken, deviceId, refreshToken} = data || {
                accessToken: null,
                deviceId: null,
                refreshToken: null
            }

            saveLoginData({accessToken, deviceId, refreshToken})
            console.log(data)
            setIsLogin(true)

        }, onError: (err) => {
            console.log(err)
        }


    },)

}


export function Logout() {
    const {setIsLogin} = useAuthStore()


    return useMutation({
        mutationFn: logoutApi, onSuccess: async (data) => {
            console.log(data)
            setIsLogin(false)

            await deleteLoginData();


        }, onError: (err) => {
            console.log(err)
        }


    },)

}




