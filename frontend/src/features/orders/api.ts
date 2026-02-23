import api from "@/app/axios";

export const createOrder = () => api.post("/orders");

export const getAllOrders = (page: string, size: string) => {
    return api.get("/orders",{
    params :{page, size}
});
}
export const getOrderbyId = (orderId: number) => api.get(`/orders/${orderId}`);