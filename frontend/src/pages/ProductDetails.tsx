import { api } from "@/api/axios";
import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

type RouteParams = {
    id: string; // URL params are strings
};

const ProductDetails = (): JSX.Element => {

    const { id } = useParams<RouteParams>();
    const [productDetails, setProductDetails] = useState<Product | null>(null);

    const numId = Number(id);
    useEffect(() => {

        if (!id) return;
        api.get<Product>(`/products/${numId}`)
            .then(res => {
                console.log(res.data);
                setProductDetails(res.data);
            })
            .catch(e => `Unexpected error; ${e}`)
    }, []);


    if (!productDetails) {
    return <h1>Product doesnt exist</h1>;
    }

    return (
        <>
           <h2>{productDetails?.name}</h2>
           <h5>{productDetails?.price}</h5>
           <p>{productDetails?.description}</p>
           <Link to={"/my-cart"}>Add to cart</Link>
           
        </>
    )
}

export default ProductDetails;