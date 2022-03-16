import { BrowserRouter, Routes, Route } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}
