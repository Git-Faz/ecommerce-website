import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/api/productApi";

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

    useEffect(() => {
        getAllProducts()
            .then(res => {
                //console.log(res.data);
                setProductData(res.data)
            })
            .catch(e => `An error occured: ${e}`)
    }, [])

    return (
        <div className="flex-col justify-between h-full space-x-3">
            <h1 id="title">Home Page</h1>
            <div>
            {productData.map(product => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-2xl font-bold mt-2">${product.price}</p>
                    <Link to={`/product/${product.id}`}>View</Link>
                </div>
                )
            )
            }
            </div>
        </div>

    )
}

export default Home;