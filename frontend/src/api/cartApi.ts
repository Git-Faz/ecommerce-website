import { api } from "./axios";

export const getCart = () => api.get("/cart");

export const addToCart = (productId: number, qty: number) => 
    api.post("/cart",{productId, qty});