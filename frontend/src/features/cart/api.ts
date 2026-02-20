import api from "@/app/axios";

export const getCart = () => api.get("/cart");

export const addToCart = (productId: number, quantity: number) => 
    api.post("/cart", { productId, quantity });

export const updateCartItem = (productId: number, quantity: number) =>
    api.patch("/cart/update", { productId, quantity });

export const deleteCartItem = (cartItemId: number) =>
    api.delete(`/cart/${cartItemId}`);

export const clearCart = () =>
    api.delete("/cart");