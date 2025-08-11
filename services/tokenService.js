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
        try{
            await SecureStore.deleteItemAsync(tokenKey[i]);
        }
        catch(err){
            throw new  Error({
                message: 'Token Removed Error.',
                err
            });
        }

    }

}





const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const DEVICE_ID_KEY = 'deviceId';

// Save all login data at once
export const saveLoginData = async ({ accessToken, refreshToken, deviceId }) => {
    try {
        await Promise.all([
            SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
            SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
            SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId)
        ]);
    } catch (error) {
        console.error("Failed to save login data", error);
    }
};

// Clear all login data at once
export const deleteLoginData = async () => {
    try {
        await Promise.all([
            SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
            SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
            SecureStore.deleteItemAsync(DEVICE_ID_KEY)
        ]);
    } catch (error) {
        console.error("Failed to delete login data", error);
    }
};

// Get individual items (needed for interceptors)
export const getAccessToken = () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
export const getDeviceId = () => SecureStore.getItemAsync(DEVICE_ID_KEY);