import { useEffect, useState, type JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "@/api/productApi";
import { addToCart } from "@/api/cartApi";
import { toast } from "sonner";
import { isLoggedIn } from "@/lib/utils";
import ProductInfo from "@/components/product/ProductInfo";


interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

const ProductDetails = (): JSX.Element => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const productId = Number(id);

    useEffect(() => {
        if (!id) return;

        getProductById(productId)
            .then(res => setProductDetails(res.data))
            .catch(e => console.error(e));
    }, [productId]);

    function addCart(prodId: number, qty: number) {
        if (!isLoggedIn()) {
            toast.info(
                <>
                    <Link to="/auth" className="underline">
                        Login
                    </Link>{" "}
                    to add items to cart
                </>
            );
            return;
        }

        addToCart(prodId, qty);
        toast.success("Item added to cart!");
    }

    if (!productDetails) {
        return <h1>Product doesn’t exist</h1>;
    }

    return (
        <div className="flex p-10">
            <ProductInfo
                name={productDetails.name}
                description={productDetails.description}
                price={productDetails.price}
                imageUrl={productDetails.imageUrl}
                categories={productDetails.categories}
                stock={25}
                quantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                onButtonClick={() =>
                    addCart(productDetails.id, selectedQuantity)
                }
            />
        </div>
    );
};



export default ProductDetails;