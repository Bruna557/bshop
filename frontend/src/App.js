import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home/Home'
import SearchResult from './pages/SearchResult/SearchResult'
import ProductDetail from './pages/Product/ProductDetail'
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
                <Route path='search' element={<SearchResult />} />
                <Route path='product/:id' element={<ProductDetail />} />
                <Route path='cart' element={<Cart />} />
                <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
