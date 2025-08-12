import {Stack} from "expo-router";
import React, {useEffect} from "react";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";
import {DeleteStoreMutation} from "@/services/mutation/StoreMutation";
import {useAuthStore} from "@/store/useAuthStore";
import {View, Text, Platform} from "react-native";
import {borderColorDark} from "@/constants/Colors";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {DotLottie} from "@lottiefiles/dotlottie-react-native";

export function Main() {
    const {data,isError,refetch,isLoading} = useGetAccessTokenFromStore()
    const {isLogin} = useAuthStore()

    useEffect(()=>{
        refetch().then(r => console.log(data,"MainTokenUse",isError) )
    },[refetch,isLogin])

    if(isLoading){
        return <View
            style={{
                flex: 1,
                width:"100%",
                height:"100%",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:borderColorDark
            }}
        >

            {
                Platform.select({
                    web:  <DotLottieReact
                        style={{
                            scale:"50%",

                        }}
                        src='https://lottie.host/a9af128e-03fd-4056-9561-6a075dc02d66/RhIAMTfpfo.lottie'
                        loop
                        autoplay
                    />,
                    android:  <DotLottie
                        style={{
                            scale:"50%",

                        }}
                        source={{uri:'https://lottie.host/a9af128e-03fd-4056-9561-6a075dc02d66/RhIAMTfpfo.lottie'}}
                        loop
                        autoplay
                    />
                })
            }

        </View>
    }

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