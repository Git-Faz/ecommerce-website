import api from "@/api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "@/api/cartApi";
//import { useParams } from "react-router-dom";


const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCart()
            .then(res => {
                //console.log(res.data)
                setCartItems(res.data)
            })
            .catch(err => `Unexpected error: ${err}`)

    }, [])

    const handleClearCart = async () => {
        try {
            await clearCart()
            setCartItems([])
        } catch (err) {
            console.error("Failed to clear cart", err)
        }
    }



    const handleCheckout = () => {
        navigate("/checkout");
    }

    if (cartItems.length === 0) {
        return (
            <div>
                <h1 id="title">Cart Page</h1>
                <h3>Your cart is empty</h3>
            </div>
        );
    }

    return (
        <>
            <h1 id="title" >Cart Page</h1>
            <div>
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
                <button onClick={handleClearCart} className="m-2 p-2 bg-red-300 text-red-700 border-red-700 border-2 hover:cursor-pointer hover:text-black text-md">Clear</button>
            </div>
            <button onClick={handleCheckout}
                className="p-2 m-2 bg-green-600 text-white text-lg border-2 border-black hover:cursor-pointer"
            >Proceed to buy</button>
        </>
    )
}

export default Cart;