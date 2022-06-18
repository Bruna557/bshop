import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home/Home'
import Product from './pages/Product/ProductDetail'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<BaseLayout />}>
                <Route index element={<Home />} />
                <Route path='product/:id' element={<Product />} />
                <Route path='cart' element={<Cart />} />
                <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
