import { useEffect, useState, type JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "@/api/productApi";
import { addToCart } from "@/api/cartApi";
import { toast } from "sonner";
import { isLoggedIn } from "@/lib/utils";

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
    //const navigate = useNavigate();
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

    function addCart(prodId: number, qty = 1) {
        if (!isLoggedIn) {
            toast.info(
                <>
                    <Link to="/auth" className="underline">
                        Login
                    </Link>{" "}
                    to add items to cart
                </>
            )
        } else {
            addToCart(prodId, qty)
            toast.success("Item added to cart!")
        }
    }


    if (!productDetails) {
        return <h1>Product doesnt exist</h1>;
    }

    return (
        <div id="product-details">
            <div className="flex flex-row justify-around p-5">
                <img src={productDetails.imageUrl} className="w-full max-w-md" alt="" />
                <div className="flex flex-col justify-evenly">
                    <h2 className="text-4xl">{productDetails?.name}</h2>
                    <h5 className="text-2xl">₹{productDetails?.price}</h5>
                    <div className=" flex-row">
                        <h6 className="text-xl mb-3 underline underline-offset-6 ">About the product: </h6>
                        <p className="text-lg">{productDetails?.description}</p>
                    </div>
                    <button onClick={() => addCart(productDetails.id,1)} className="bg-blue-500 text-white px-4 py-2 rounded">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;