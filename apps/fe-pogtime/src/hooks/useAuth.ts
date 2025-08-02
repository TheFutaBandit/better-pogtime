import { useAuthToken, useAuthUser } from "@/stores/authStore"
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
    const token = useAuthToken();
    const user = useAuthUser();
    
    return {
        isAuthenticated: !!token,
        token,
        user
    }
}

export const useRequireAuth = (redirectPage: string = '/auth/sign-in') => {
    const {isAuthenticated, user} = useAuthStatus();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const authTime = setTimeout(() => {
    //         if(!isAuthenticated) {
    //             router.push(redirectPage)
    //         } else {
    //             setIsLoading(false);
    //         }
    //     }, 100)

    //     return () => clearTimeout(authTime);
    // }, [isAuthenticated, redirectPage])

    return {
        isAuthenticated, 
        user,
        isLoading: isLoading || !isAuthenticated
    }  
}

export const useRedirectIfAuth = () => {
    const {user, isAuthenticated} = useAuthStatus();
    const router = useRouter();

    // console.log("am I running?")

    useEffect(() => {
        if(isAuthenticated) {
            router.push(`/dashboard/${user}`)
        }
    }, [isAuthenticated])

    return {isAuthenticated};
}