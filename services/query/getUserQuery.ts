import {useQuery} from "@tanstack/react-query";
import {GetUserData} from "../functions/profile/profileApi";
import {UserDataType} from "@/constants/Types";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";

export const useGetUserQuery =  () => {
    const {data} :{data:string} = useGetAccessTokenFromStore()

    return useQuery(
        {
            queryFn:()=> GetUserData(data),
            queryKey: ["user"],
            refetchOnWindowFocus: false,
            initialData:<UserDataType>{
                name:"empty"
            },
            refetchOnMount:true

        }
    )
}