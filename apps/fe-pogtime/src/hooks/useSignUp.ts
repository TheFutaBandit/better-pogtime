import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

type IUser = {
    userId: string
}

async function signup_func(username: string, password: string): Promise<IUser> {
    try {
        const response = await axios.post("http://localhost:3001/api/v1/auth/sign-up", {
            username,
            password
        });

        return await response.data;
    } catch(e) {
        console.log(e);
        throw new Error("failed to receive data");
    }  
}



type IUseSignUp = {
    signUpMutation: UseMutateFunction<IUser, unknown, {
    username: string,
    password: string,
    }, unknown>,
    isLoading: boolean
}

export function useSignUp(): IUseSignUp {
    const queryClient = useQueryClient();
    const router = useRouter();

    const {mutate: signUpMutation, isPending: isLoading} = useMutation<IUser, unknown, {username: string, password: string}, unknown>({
        mutationFn: ({
            username,
            password
        }) => signup_func(username, password),
        onSuccess: () => {
            router.push('/auth/signin')
        },
        onError: (error) => {
            console.log(error);
            enqueueSnackbar("Error during signup. Try again", {
                variant: 'error'
            })
        }
    });

    return {
        signUpMutation,
        isLoading
    };
    
}