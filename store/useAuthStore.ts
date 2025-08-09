import {create} from 'zustand';

interface AuthState {
    isLogin: boolean;
    accessToken: string;
    deviceId: string;
    refreshToken: string;
    setIsLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogin: false,
    accessToken: "",
    deviceId: "",
    refreshToken: "",

    setIsLogin: (value: boolean) => {
        set({isLogin: value});
    }


}));