import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import type { JSX } from "react";

const AppRoutes = (): JSX.Element => {
    return(
        <Routes>
            <Route path = "/" element={<Home/>}>Home</Route>
            <Route path = "my-cart" element={<Cart/>}>Cart</Route>
            <Route path = "/product" element={<ProductDetails/>}>Home</Route>
        </Routes>
    )
}

export default AppRoutes;