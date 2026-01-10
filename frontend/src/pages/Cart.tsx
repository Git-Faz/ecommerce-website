import { api } from "@/api/axios";
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";


const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);

   // const { id } = useParams<{ id: string }>();

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
        </>
    )
}

export default Cart;