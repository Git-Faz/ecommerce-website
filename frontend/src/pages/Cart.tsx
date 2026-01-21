import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart, deleteCartItem } from "@/api/cartApi";
import CartItemCard from "@/components/cart/CartItemCard";

interface CartItem {
  id: number;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}


const Cart = (): JSX.Element => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCart()
            .then(res => {
                console.log(res.data)
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

    const handleDelete = async (itemId: number) => {
        try {
            await deleteCartItem(itemId);
            setCartItems(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Failed to delete cart item", error);
        }
    }

    

    return (
        <>
            <h1 id="title" >
                My Cart
            </h1>

            <div>
                {
                    cartItems.map((item: any) => (

                        <CartItemCard
                        key={item.id}
                            name={item.productName}
                            imageUrl={item.productImageUrl}
                            price={item.productPrice}
                            quantity={item.quantity}
                            total={item.totalPrice}
                            onDelete={() => handleDelete(item.id)}
                        />
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