import { api } from "@/api/axios";
import { useState, useEffect } from "react";


const Cart = () => {

    const [cartItems, setCartItems] = useState();

    useEffect(() => {
      api
        .get("/cart/:id")
        .then(res =>{ 
            console.log(res.data)
            setCartItems(res.data)
        })
        .catch(err => `Unexpected error: ${err}`)

    }, [])
    
    return (
        <h1>Cart Page</h1>
    )
}

export default Cart;