import { type JSX, use, Suspense, } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/api/productApi";
import ProductCard from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg"
import { addToCart } from "@/api/cartApi";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import { useAuth } from "@/hooks/useAuth";


export interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

const productPromise = getAllProducts();

function ProductsList(): JSX.Element {
    const { data: productData } = use(productPromise);

    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();

    if (productData.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold">
                    No products available
                </p>
                <p className="text-sm text-gray-500">
                    Please check back later.
                </p>
            </div>
        );
    }


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

    return (
        <div className="h-full w-full space-x-3 flex-wrap ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-5">
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
                        onBtnClick={() => addCart(product.id)}
                    />
                )
                )
                }
            </div>

        </div>
    )
}

const Home = (): JSX.Element => {

    return (
        <Suspense fallback={<Loading message="Loading Products..." />} >
            <ProductsList />
        </Suspense>
    )
}




export default Home;