import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Auth from "@/pages/Auth";
import type { JSX } from "react";

const AppRoutes = (): JSX.Element => {
    return(
        <Routes>
            <Route path = "/" element={<Home/>}></Route>
            <Route path = "/my-cart" element={<Cart/>}></Route>
            <Route path = "/product/:id" element={<ProductDetails/>}></Route>
            <Route path ="/checkout" element={<Checkout/>}></Route>
            <Route path ="/auth" element={<Auth/>}></Route>
        </Routes>
    )
}

export default AppRoutes;