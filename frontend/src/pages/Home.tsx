import { type JSX, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts, getProductByName } from "@/api/productApi";
import ProductCard from "@/components/product/ProductCard";
import placeholder from "../assets/placeholder.jpg";
import { addToCart } from "@/api/cartApi";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import { useAuth } from "@/hooks/useAuth";
import Body from "@/components/layout/Body";

export interface Product {
    id: number;
    name: string;
    description: string;
    categories: string[];
    price: number;
    stock: number;
    imageUrl: string;
}

function ProductsList(): JSX.Element {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("name")?.trim().toLowerCase() ?? "";
    console.log("Search query:", query);

    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        async function fetchProducts() {

            if (query && query.length < 5) {
                setProducts([]);
                setStatus("idle");
                return;
            }

            setStatus("loading");

            try {
                const response = query.length >= 5
                    ? await getProductByName(query)
                    : await getAllProducts();

                if (!cancelled) {
                    setProducts(response.data);
                    setStatus("idle");
                }
            } catch (error) {
                if (!cancelled) {
                    setStatus("error");
                }
            }
        }

        fetchProducts();

        return () => {
            cancelled = true;
        };
    }, [query]);

    if (status === "loading") {
        return <Loading message="Loading Products..." />;
    }

    if (status === "error") {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold">
                    Failed to load products.
                </p>
                <p className="text-sm text-gray-500">
                    Please try again.
                </p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-lg font-semibold">
                    {query
                        ? `No results found for "${query}"`
                        : "No products available"}
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
            );
        } else {
            addToCart(prodId, qty);
            toast.success("Item added to cart!");
        }
    }

    return (
        <Body>
            <div className="flex flex-col justify-center w-full h-full py-20">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-y-4 gap-x-8 flex-1">
                    {products.map((product) => (
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
                    ))}
                </div>
            </div>
        </Body>
    );
}

export default ProductsList;
