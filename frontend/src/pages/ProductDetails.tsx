import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/api/productApi";
import { addToCart} from "@/api/cartApi";

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
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState<Product | null>(null);

    const productId = Number(id);
    useEffect(() => {

        if (!id) return;
        getProductById(productId)
            .then(res => {
                console.log(res.data);
                setProductDetails(res.data);
            })
            .catch(e => `Unexpected error; ${e}`)
    }, [productId]);

    const handleAddToCart = async () => {
    if (productDetails) {
        try {
            await addToCart(productId, 1);
            console.log("Added to cart");
            navigate("/cart")
        } catch (e) {
            console.error("Failed to add to cart:", e);
        }
    }
};


    if (!productDetails) {
        return <h1>Product doesnt exist</h1>;
    }

    return (
        <>
            <h2>{productDetails?.name}</h2>
            <h5>{productDetails?.price}</h5>
            <p>{productDetails?.description}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">Add to cart</button>

        </>
    )
}

export default ProductDetails;