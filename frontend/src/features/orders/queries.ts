import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "./api";
import type { OrderProp } from "./types";
import type { Page } from "@/shared/types";

/* const orderKeys = {
    all: ["orders"] as const,
} */

export default function useOrders (page: number,) {
    const PAGE_SIZE = 10;

    return useQuery<Page<OrderProp>>({
        queryKey:["orders", page],
        queryFn: async () => {
            const response = await getAllOrders(page, PAGE_SIZE);
            return response.data;
        },
        placeholderData: keepPreviousData
    });
}