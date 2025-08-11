import {Stack} from "expo-router";
import React, {useEffect} from "react";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";
import {DeleteStoreMutation} from "@/services/mutation/StoreMutation";
import {useAuthStore} from "@/store/useAuthStore";

export function Main() {
    const {data,isError,refetch} = useGetAccessTokenFromStore()
    const {mutate} = DeleteStoreMutation()
    const {isLogin} = useAuthStore()

    useEffect(()=>{
        refetch().then(r => console.log(data,"MainTokenUse",isError) )
       // mutate(["accessToken","deviceId"])
    },[refetch,isLogin])


    return (<Stack>
            <Stack.Protected guard={!data}>
                <Stack.Screen name={"index"} options={{headerShown: false}}/>
                <Stack.Screen name={"forgot-pass"} options={{headerShown: false}}/>

            </Stack.Protected>

            <Stack.Protected guard={!!data}>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
            </Stack.Protected>

        </Stack>)
}