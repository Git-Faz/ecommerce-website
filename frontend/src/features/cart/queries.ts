import { useQuery } from "@tanstack/react-query";
import { getCart } from "./api";
import type { CartItemResponse } from "./types";

export const cartKeys = {
  all: ["cart"] as const,
};

export default function useCart (){
    return useQuery<CartItemResponse[]>({
        queryKey: cartKeys.all,
        queryFn: async () => {
            const reponse = await getCart();
            return reponse.data;
        }
    })
}