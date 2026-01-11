import { api } from "@/api/axios";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";


const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        const userId = Number(localStorage.getItem("userId") ?? 1); // or get from route/auth
        if (!userId) {
            console.warn("userId missing");
            return;
        }
        api
            .get(`/cart`, { params: { userId } })
            .then(res => {
                console.log(res.data)
                setCartItems(res.data)
            })
            .catch(err => `Unexpected error: ${err}`)

    }, [])

    const handleCheckout = () => {
        navigate("/checkout");
    }

    if (cartItems.length === 0) {
        return <h1>Your cart is empty</h1>;
    }

    return (
        <>
            <h1>Cart Page</h1>
            {
                cartItems.map((item: any) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{item.productName}</h3>
                        <p className="text-2xl font-bold mt-2">${item.productPrice}</p>
                        <p className="text-md mt-2">Quantity: {item.quantity}</p>
                        <p>Total: ${item.totalPrice}</p>
                    </div>
                ))  
            }
            <button onClick={handleCheckout}
                        className="p-2 bg-green-600 text-white text-lg border-2 border-black hover:cursor-pointer"
                        >Proceed to buy</button>
        </>
    )
}

export default Cart;