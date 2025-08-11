import {useMutation} from "@tanstack/react-query";
import {loginApi} from "@/services/api/authApi";
import {useAuthStore} from "@/store/useAuthStore";


export function AuthMutation() {
    const {setIsLogin} = useAuthStore()
    return useMutation({
        mutationFn: (data) => loginApi(data),
        onSuccess: (data) => {
            setIsLogin(true)
        },


    },)

}