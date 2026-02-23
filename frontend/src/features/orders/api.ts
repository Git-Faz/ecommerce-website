import api from "@/app/axios";
import type { OrderProp } from "./types";
import type { Page } from "@/shared/types";

export const createOrder = () => api.post<OrderProp>("/orders");

export const getAllOrders = (page: number, size: number) => {
    return api.get<Page<OrderProp>>("/orders", {
        params: { page, size }
    });
}
//unused
export const getOrderbyId = (orderId: number) => api.get(`/orders/${orderId}`);