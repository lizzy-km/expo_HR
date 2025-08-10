import axios from "axios";
import {getDataFromStore, removeAllDataFromStore, saveDataToStore} from "../tokenService";
import {endPoints} from "./endPoints";

export const BASE_URL = 'https://proxy-hr-ochre.vercel.app';
export const api = axios.create({
    baseURL: BASE_URL, // add backend url here
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(async (config) => {

    const accessToken =    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXVuZ215YXRzb2UyazIxQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NTQ4MDg0MjUsImV4cCI6MTc1NDgzMDAyNX0.tLbxFhoLDEKcQ_SP1H5ETfPW4w8ejJnHbk4ziyI3UOQcsJwkpKAmwnDZtQYKhJRr9h_wQ-jrZvCPfAlFgA-XPg"

    // await getDataFromStore("accessToken")
    const refreshToken =""
        // await getDataFromStore("refreshToken");
    const deviceId ="2980465b-08ff-46b2-9785-2b1de3ebf252"
        // await getDataFromStore("deviceId")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers["Device-UUID"] = `${deviceId}`;

    return config;

}, error => {
    return Promise.reject(error);
})

let isRefreshing = false; // Flag to indicate if a refresh token request is in progress
let failedQueue = []; // Array to store pending requests
// Helper function to process the queue
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
api.interceptors.response.use(
    (response) => response,
    async (error) => {
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

            try {
                const refreshToken = await getDataFromStore("refreshToken") || false;
                if (!refreshToken) {
                    // Handle case where refresh token is also expired or missing
                    await removeAllDataFromStore();
                    return Promise.reject(error);
                }

                const refreshResponse = await api
                    .post(endPoints.auth.refresh, {refreshToken})
                    .catch(async (refreshError) => {
                        await removeAllDataFromStore();
                        failedQueue.forEach((promise) => promise.reject(refreshError));
                        failedQueue = []; // Clear the queue
                    }); // Send refresh token

                const data = refreshResponse?.data
                    ? refreshResponse.data
                    : refreshResponse;
                await saveDataToStore("refreshToken", data?.refreshToken);
                await saveDataToStore("accessToken", data?.accessToken);
                await saveDataToStore("deviceId", data?.deviceId);
                await saveDataToStore("expiredAt", data?.expiresAt);

                const newAccessToken = await getDataFromStore("accessToken");
                // Update the header of the original request
                api.defaults.headers.common["Authorization"] =
                    "Bearer " + newAccessToken;
                originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

                processQueue(null, newAccessToken);

                return api(originalRequest); // Retry the original request
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                processQueue(refreshError, null);
                await removeAllDataFromStore();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false; // Reset the refreshing flag
            }
        }
        if (error?.response?.status === 401) {
            await removeAllDataFromStore();
        }
        if (error?.code === "ECONNABORTED" || error?.status === 500 || error?.response?.status === 500) {
            // window.location.replace('/500')
        }

        return Promise.reject(error);
    },
);