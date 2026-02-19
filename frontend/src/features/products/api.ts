import api from "@/app/axios";

interface Product {
        id: number;
        name: string;
        description: string;
        categories: string[];
        price: number;
        stock: number;
        imageUrl: string;
    }

export const getAllProducts = (page: number, size: number) => {
    return api.get<Product[]>("/products", {params: {page,size }});
}

export const getProductById = (id : number | string) =>{
    return api.get<Product>(`/products/${id}`)
}

export const getProductByName = (name: string) =>
  api.get<Product[]>("/products/search", {
    params: { name },
  });
