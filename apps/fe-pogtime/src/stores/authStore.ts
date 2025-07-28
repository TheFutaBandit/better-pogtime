import {create} from 'zustand';
import {persist} from 'zustand/middleware'


type AuthAction = {
    loginUserToken: (token: AuthState['token']) => void,
    loginUserUsername: (token: AuthState['user']) => void
}

type AuthState = {
    token: string,
    user: string,
    actions: AuthAction
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
    token: "",
    user: "",
    actions: {
        loginUserToken: (token) => set(() => ({token})),
        loginUserUsername: (user) => set(() => ({user}))
    }}),
    {
       name: "auth-storage"
    },
    ),
);

export const useAuthToken = () => useAuthStore((state) => state.token);

export const useAuthUser = () => useAuthStore((state) => state.user);

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const getAuthToken = () => useAuthStore.getState().token;

