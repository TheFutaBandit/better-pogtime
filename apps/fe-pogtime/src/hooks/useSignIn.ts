import { useAuthActions } from "@/stores/authStore";
import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import {jwtDecode} from "jwt-decode";

type IToken = {
    token: string
}

interface JwtPayload {
    user_id: string
  }

async function signin_func(username: string, password: string): Promise<IToken> {
    try {
        // //console.log("sending request")
        const response = await axios.post("http://localhost:3001/api/v1/auth/sign-in", {
            username,
            password
        });

        return await response.data;
    } catch(e) {
        //console.log(e);
        throw new Error("failed to receive data");
    }  
}

type IUseSignIn = {
    signInMutation: UseMutateFunction<
    IToken, 
    unknown, 
    { username: string, password: string}, 
    unknown
    >;
    isLoading: boolean;

}

export function useSignIn(): IUseSignIn {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { loginUserToken, loginUserUsername, loginUserSetUsername } = useAuthActions();

    const {mutate: signInMutation, isPending : isLoading} = useMutation<IToken, unknown, { username: string, password: string}, unknown>({
        mutationFn: ({
            username,
            password
        }) => signin_func(username, password),
        onSuccess: (data, variables) => {
            let token = data.token.replace("Bearer", "");
            const user_payload = jwtDecode(token) as JwtPayload;
            loginUserToken(token);
            loginUserUsername(user_payload.user_id);
            loginUserSetUsername(variables.username);
            localStorage.setItem('token', token);
            router.push(`/dashboard/${user_payload.user_id}`)
        },
        onError: (error) => {
            //console.log(error);
            enqueueSnackbar("Error during signin. Try again", {
                variant: 'error'
            })
        }
    });

    return {
        signInMutation,
        isLoading
    };
    
}