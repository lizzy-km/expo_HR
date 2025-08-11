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