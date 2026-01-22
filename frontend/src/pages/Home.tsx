import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/api/productApi";
import ProductCard from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg"
import { addToCart } from "@/api/cartApi";
import { toast } from "sonner";


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

    function addCart(prodId: number, qty = 1) {
        if (!localStorage.getItem('token')) {
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
        <div className="h-full space-x-3 ">
            <div className="flex flex-row gap-x-4 m-10">
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

export default Home;