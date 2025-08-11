import {api} from "../../api/api";
import {endPoints} from "../../api/endPoints";
import { UserDataType} from "@/constants/Types";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";



export const GetUserData = async (data:string):Promise<UserDataType> => {


    try {
      return  await api.get(endPoints.api.userData,{
          headers:{
              Authorization: `Bearer ${data}`
          }
      }).then(({data}) => {
          return data
      }).catch((error) => {
          Promise.reject(error)
      });
    } catch (err) {
            return Promise.reject(err);
    }
}