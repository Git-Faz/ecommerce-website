import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart, deleteCartItem } from "@/api/cartApi";
import CartItemCard from "@/components/cart/CartItemCard";
import { Button } from "@/components/ui/button";

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
        <div className="m-5 p-5">
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
            </div>
            <div className="flex justify-end gap-x-5 min-w-fit w-3xl">
                <Button variant={"destructive"} size={"sm"} onClick={handleClearCart} className="bg-red-300 text-black hover:bg-red-500" >Clear</Button>
                <Button size={"sm"} onClick={handleCheckout} className="bg-green-300 text-black hover:bg-green-400"
                >Proceed to buy</Button>
            </div>
        </div>
    )
}

export default Cart;