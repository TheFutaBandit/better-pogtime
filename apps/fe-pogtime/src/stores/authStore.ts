import {create} from 'zustand';
import {persist} from 'zustand/middleware'


type AuthAction = {
    loginUserToken: (token: AuthState['token']) => void,
    loginUserUsername: (token: AuthState['user']) => void,
    loginUserSetUsername: (username: AuthState['username']) => void
}

type AuthState = {
    token: string,
    user: string,
    username: string,
    actions: AuthAction
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
    token: "",
    user: "",
    username: "",
    actions: {
        loginUserToken: (token) => set(() => ({token})),
        loginUserUsername: (user) => set(() => ({user})),
        loginUserSetUsername: (username) => set(() => ({username}))
    }}),
    {
       name: "auth-storage"
    },
    ),
);

export const useAuthToken = () => useAuthStore((state) => state.token);

export const useAuthUser = () => useAuthStore((state) => state.user);

export const useAuthUsername = () => useAuthStore((state) => state.username);

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const getAuthToken = () => useAuthStore.getState().token;

