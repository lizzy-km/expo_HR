import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../functions/profile/profileApi";
import {UserDataType} from "@/constants/Types";

export const useGetUserQuery =  () => {
    return useQuery(
        {
            queryFn:getUserData,
            queryKey: ["user"],
            refetchOnWindowFocus: false,
            initialData:<UserDataType>{

            },
            refetchOnMount:true

        }
    )
}