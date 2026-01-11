import { api } from "./axios";

export const createOrder = () => api.post("/orders");

export const getAllOrders = () => api.get("/orders");

export const getOrderbyId = (orderId: number) => api.get(`/orders/${orderId}`);