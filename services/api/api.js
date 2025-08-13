import axios from "axios";
import {endPoints} from "./endPoints";
import {
    useGetAccessTokenFromStore,
    useGetDeviceIdFromStore,
    useGetRefreshTokenFromStore
} from "@/services/query/getStoreQuery";
import {DeleteStoreMutation, StoreMutation} from "@/services/mutation/StoreMutation";
import {deleteLoginData, getAccessToken, getDeviceId, getRefreshToken, saveLoginData} from "@/services/tokenService";
import {router} from "expo-router";

export const BASE_URL = 'https://proxy-hr-ochre.vercel.app';


export const api = axios.create({
    baseURL: BASE_URL, // add backend url here
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false; // Flag to indicate if a refresh token request is in progress
let failedQueue = []; // Array to store pending requests

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            // Update the header of the queued request with the new token
            prom.config.headers["Authorization"] = "Bearer " + token;
            // Resolve the promise with the new request
            prom.resolve(api(prom.config));
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(async (config) => {

    const accessToken = await getAccessToken();
    const deviceId = await getDeviceId();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers["Device-UUID"] = `${deviceId}`;

    return config;

}, error => {
    return Promise.reject(error);
})

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    // Check for 408 status and if the request hasn't been retried yet
    if (error?.response?.status === 408 && !originalRequest?._retry) {
        // If a refresh is already in progress, queue this request
        if (isRefreshing) {
            return new Promise(function(resolve, reject) {
                // Store the original request config along with the promise resolvers
                failedQueue.push({resolve, reject, config: originalRequest});
            }).catch((err) => {
                return Promise.reject(err); // Propagate rejection
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        const refreshToken = await getRefreshToken();

        try {
            if (!refreshToken) {
                // Handle case where refresh token is also expired or missing
                await deleteLoginData();
                router.replace("/login");
                return Promise.reject(error);
            }

            const refreshResponse = await api
                .post(endPoints.auth.refresh, {refreshToken})
                .catch(async (refreshError) => {
                    await deleteLoginData();
                    router.replace("/login");

                    failedQueue.forEach((promise) => promise.reject(refreshError));
                    failedQueue = []; // Clear the queue
                }); // Send refresh token

            const data = refreshResponse?.data ? refreshResponse.data : refreshResponse;

            const accessToken = data?.accessToken
            const refreshToken = data?.refreshToken
            const deviceId = data?.deviceId

            await saveLoginData({ accessToken, refreshToken, deviceId });

            const newAccessToken = accessToken
            // Update the header of the original request
            api.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
            originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

            processQueue(null, newAccessToken);

            return api(originalRequest); // Retry the original request
        } catch (refreshError) {
            // Handle refresh token failure (e.g., redirect to login)
            processQueue(refreshError, null);
            await deleteLoginData();
            router.replace("/login");

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false; // Reset the refreshing flag
        }
    }
    if (error?.response?.status === 401) {
        await deleteLoginData();
        router.replace("/login");

    }
    if (error?.code === "ECONNABORTED" || error?.status === 500 || error?.response?.status === 500) {
        // window.location.replace('/500')
    }

    return Promise.reject(error);
},);


export const API = () => {



    const {data: accessToken} = useGetAccessTokenFromStore()
    const {data: refreshToken} = useGetRefreshTokenFromStore()
    const {data: deviceId} = useGetDeviceIdFromStore()

    const {mutate: DeleteStoreData} = DeleteStoreMutation()

    function SaveLoginData (accessToken, refreshToken, deviceId) {
        const {
            mutate: saveAccessToken, data: accessTokenData, failureReason
        } = StoreMutation(accessToken, "accessToken")
        const {mutate: saveRefreshToken, data: refreshTokenData} = StoreMutation(refreshToken, "accessToken")
        const {mutate: saveDeviceId, data: deviceIdData} = StoreMutation(deviceId, "deviceId")
        saveAccessToken()
        saveRefreshToken()
        saveDeviceId()
    }




    // Helper function to process the queue


    return null;

}








