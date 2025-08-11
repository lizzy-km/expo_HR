// services/tokenService.js
import * as SecureStore from 'expo-secure-store';
import {useMutation} from "@tanstack/react-query";


export async function saveDataToStore (token,TOKEN_KEY)  {

    // await SecureStore.setItemAsync(TOKEN_KEY,token)
    // console.log(token,TOKEN_KEY,"Mutation Key AN Value");

    try {
         await SecureStore.setItemAsync(TOKEN_KEY,token).catch((err)=>{console.log(err)
        throw new  Error(err)});
    } catch (error) {

         throw new  Error(error);
    }
}

export const getDataFromStore = async (TOKEN_KEY) => {
    try {
        // Use the correct function: getItemAsync
        const token = await SecureStore.getItemAsync(TOKEN_KEY); // CORRECT

        if (token) {
            return token;
        }
        return token;
    } catch (error) {
        throw new  Error({
            message: 'No token found.',
            error
        });
    }
};

export const deleteDataFromStore = async (TOKEN_KEY) => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error(TOKEN_KEY, error);
    }
};

export const removeAllDataFromStore = async (tokenKey:["accessToken","refreshToken"]) => {
    let i
    for (i in tokenKey) {
        await SecureStore.deleteItemAsync(tokenKey[i]);
    }

}