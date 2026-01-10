import { api } from "./axios";

export const createOrder = (data: any) => api.post("/orders", data);

export const getAllOrders = () => api.get("/orders");

export const getOrderbyId = (orderId: number) => api.get(`/orders/${orderId}`);