import {useMutation} from "@tanstack/react-query";
import {loginApi} from "@/services/api/authApi";
import {removeAllDataFromStore, saveDataToStore} from "@/services/tokenService";

export function StoreMutation(value,key){
    return useMutation({
            mutationFn:()=>saveDataToStore(value,key),
            onSuccess:(res:any)=>{

                console.log(res,"Storemutation")
                // saveDataToStore(res,"loginData")
            },

        },

    )

}

export function DeleteStoreMutation(){
    return useMutation({
            mutationFn:(data)=> removeAllDataFromStore(data),
            onSuccess:(res:any)=>{

                console.log(res,"StorDeeleteemutation")
                // saveDataToStore(res,"loginData")
            },

        },

    )

}

