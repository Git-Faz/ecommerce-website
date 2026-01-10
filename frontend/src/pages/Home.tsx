import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/api/productApi";


const Home = (): JSX.Element => {

    interface Product {
        id: number;
        name: string;
        description: string;
        categories: string[];
        price: number;
        stock: number;
        imageUrl: string;
    }

    const [productData, setProductData] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts()
            .then(res => {
                console.log(res.data);
                setProductData(res.data)
            })
            .catch(e => `An error occured: ${e}`)
    }, [])

    return (
        <>
            <h1>Home Page</h1>
            {productData.map(product => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-2xl font-bold mt-2">${product.price}</p>
                    <Link to={`/product/${product.id}`}>View</Link>
                </div>
                )
            )
            }

        </>

    )
}

export default Home;