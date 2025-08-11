import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../functions/profile/profileApi";
import {UserDataType} from "@/constants/Types";
import {getDataFromStore} from "@/services/tokenService";

export const useGetAccessTokenFromStore =  () => {
    return useQuery(
        {
            queryFn:()=>getDataFromStore("accessToken"),
            queryKey: ["accessToken"],
            refetchOnWindowFocus: false,
            refetchOnMount:true

        }
    )
}

export const useGetRefreshTokenFromStore =  () => {
    return useQuery(
        {
            queryFn:()=>getDataFromStore("refreshToken"),
            queryKey: ["refreshToken"],
            refetchOnWindowFocus: false,
            refetchOnMount:true

        }
    )
}

export const useGetDeviceIdFromStore =  () => {
    return useQuery(
        {
            queryFn:()=>getDataFromStore("deviceId"),
            queryKey: ["deviceId"],
            refetchOnWindowFocus: false,
            refetchOnMount:true

        }
    )
}