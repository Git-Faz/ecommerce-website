import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Auth from "@/pages/Auth";
import Order from "@/pages/Order"
import type { JSX } from "react";

const AppRoutes = (): JSX.Element => {
    return(
        <Routes>
            <Route path = "/" element={<Home/>}></Route>
            <Route path = "/cart" element={<Cart/>}></Route>
            <Route path = "/products/:id" element={<ProductDetails/>}></Route>
            <Route path ="/checkout" element={<Checkout/>}></Route>
            <Route path="/orders" element={<Order/>}/>
            <Route path ="/auth" element={<Auth/>}></Route>
        </Routes>
    )
}

export default AppRoutes;