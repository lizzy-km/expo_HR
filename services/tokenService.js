// services/tokenService.js
import * as SecureStore from 'expo-secure-store';


export const saveDataToStore = async (TOKEN_KEY,token) => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
        console.error(TOKEN_KEY, error);
    }
};

export const getDataFromStore = async (TOKEN_KEY) => {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error(TOKEN_KEY, error);
        return null;
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