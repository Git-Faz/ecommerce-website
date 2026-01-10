import { api } from "./axios";

interface Product {
        id: number;
        name: string;
        description: string;
        categories: string[];
        price: number;
        stock: number;
        imageUrl: string;
    }

export const getAllProducts = () => {
    return api.get<Product[]>("/products");
}

export const getProductById = (id : number | string) =>{
    return api.get<Product>(`products/${id}`)
}