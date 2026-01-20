import { useEffect, useState, type JSX } from "react";
import { getAllProducts } from "@/api/productApi";
import ProductCard from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

export interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

const Home = (): JSX.Element => {

    const [productData, setProductData] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts()
            .then(res => {
                console.log(res.data);
                setProductData(res.data)
            })
            .catch(e => `An error occured: ${e}`)
    }, [])

    return (
        <div className="h-full space-x-3">
            <h1 id="title">Home Page</h1>
            <div className="flex flex-row gap-x-4">
                {productData.map(product => (
                        <ProductCard
                            key={product.id}
                            img={{
                                link: product.imageUrl || placeholder,
                                alt: "product image",
                            }}
                            name={product.name}
                            price={product.price}
                            onClick={() => navigate(`/products/${product.id}`)}
                        />
                )
                )
                }
            </div>

        </div>

    )
}

export default Home;