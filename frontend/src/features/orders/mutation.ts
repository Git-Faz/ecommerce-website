import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "./api";
import type { OrderProp } from "./types";

export default function useCreateOrder () {
    const queryClient = useQueryClient ();
    return useMutation<OrderProp>({
        mutationFn: async () => {
            const response = await createOrder();
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["orders"]})
            queryClient.invalidateQueries({queryKey:["cart"]})
        }
    })
}