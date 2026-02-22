import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToCart, clearCart, deleteCartItem } from "./api";
import type { AddToCartInput } from "./types";
import { cartKeys } from "./queries";


export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({productId, quantity}: AddToCartInput) => {
            return addToCart(productId, quantity)
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: cartKeys.all
        })
    })
}

export function useClearCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            return clearCart()
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: cartKeys.all}),
    })
}

export function useDeleteCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(itemId: number) => {
            return deleteCartItem(itemId)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: cartKeys.all}),
    })
}