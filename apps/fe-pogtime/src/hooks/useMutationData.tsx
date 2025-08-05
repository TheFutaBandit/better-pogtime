import { MutationFunction, MutationKey, QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: QueryKey[],
    onSuccess?: () => void
) => {
    const  client = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationKey,
        mutationFn,
        onSuccess(data: any) {
            if(onSuccess) onSuccess()
            return toast(data?.status === 200 ? 'Success' : 'Error', {
                description: data?.data
            })
        },
        onSettled: async() => {
            queryKey!.map(async (item) => {
                return await client.invalidateQueries({queryKey: item})
            })
        }
    })

    return {
        mutate,
        isPending
    }
}