import {api, API} from "../../api/api";
import {endPoints} from "../../api/endPoints";
import { UserDataType} from "@/constants/Types";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";



export const GetUserData = async ():Promise<UserDataType> => {


    try {
      return  await api.get(endPoints.api.userData,).then(({data}) => {
          return data
      }).catch((error) => {
          Promise.reject(error)
      });
    } catch (err) {
            return Promise.reject(err);
    }
}