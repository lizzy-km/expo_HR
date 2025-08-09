import {api} from "../../api/api";
import {endPoints} from "../../api/endPoints";
import { UserDataType} from "@/constants/Types";



export const getUserData = async ():Promise<UserDataType> => {
    try {
      return  await api.get(endPoints.api.userData).then(({data}) => data).catch((error) => Promise.reject(error));
    } catch (err) {
            return Promise.reject(err);
    }
}