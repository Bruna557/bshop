const dummyCatalog = [
    {"id":"1","name":"Headset X532","description":"Premium gaming headset for PC and consoles (PS4 and Xbox) exceptional sound quality with high-frequency response and extra bass.","image_url":"https://images.unsplash.com/photo-1600186279172-fdbaefd74383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80","price":"66.61","rating":4,"number_of_reviews":345},
    {"id":"2","name":"Headset MF41","description":"Wireless Bluetooth gaming headset for PC PS4 PS5 Playstation.","image_url":"https://images.unsplash.com/photo-1565876480410-91009978e5b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80","price":"36.54","rating":4.5,"number_of_reviews":2972},
    {"id":"3","name":"Keyboard X1","description":"Gaming keyboard RGB illumination water resistant.","image_url":"https://images.unsplash.com/photo-1626958390898-162d3577f293?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"104.99","rating":4.5,"number_of_reviews":13792},
    {"id":"4","name":"Keyboard XSM","description":"Basic wireless keyboard US-Layout (QWERTY).","image_url":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80","price":"22.38","rating":3.5,"number_of_reviews":322},
    {"id":"5","name":"Mouse AA37","description":"High Performance Wired Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1593108408993-58ee9c7825c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"39.99","rating":4.0,"number_of_reviews":28057},
    {"id":"6","name":"Mouse PB327","description":"Wireless Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80","price":"29.99","rating":5.0,"number_of_reviews":6793},
    {"id":"7","name":"Mouse 82LO","description":"Wireless Mouse.","image_url":"https://images.unsplash.com/flagged/photo-1561023367-4431103a484f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80","price":"10.98","rating":3.0,"number_of_reviews":437},
    {"id":"8","name":"Laptop HJ22","description":"Laptop 17.3 inches 11th Gen Intel Core i5 16GB DDR4 RAM 1TB SSD Windows 11.","image_url":"https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80","price":"369","rating":4.0,"number_of_reviews":837},
    {"id":"9","name":"Laptop X977U","description":"Laptop 15.6 inches Full HD AMD Ryzen 3 335OU 4GB RAM DDR4.","image_url":"https://images.unsplash.com/photo-1595234336271-178875797b4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"799","rating":5.0,"number_of_reviews":2849},
    {"id":"10","name":"Office Chair RD2D","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://images.unsplash.com/photo-1580480095047-4aa43ab3bd1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","price":"191.66","rating":4.0,"number_of_reviews":412},
    {"id":"11","name":"TV KJM7","description":"32 inches 4K UHD Smart TV.","image_url":"https://images.unsplash.com/photo-1601944179066-29786cb9d32a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"497","rating":5.0,"number_of_reviews":34217},
    {"id":"12","name":"Headset LMJ7","description":"Premium gaming headset for PC and consoles (PS4 and Xbox) exceptional sound quality with high-frequency response and extra bass.","image_url":"https://images.unsplash.com/photo-1600186279172-fdbaefd74383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80","price":"80.71","rating":3.5,"number_of_reviews":42},
    {"id":"13","name":"Keyboard ML88","description":"Gaming keyboard RGB illumination water resistant.","image_url":"https://images.unsplash.com/photo-1626958390898-162d3577f293?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"70.88","rating":2.5,"number_of_reviews":13},
    {"id":"14","name":"Keyboard L7M8","description":"Basic wireless keyboard US-Layout (QWERTY).","image_url":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80","price":"30.99","rating":5.0,"number_of_reviews":871},
    {"id":"15","name":"Mouse PLB8","description":"High Performance Wired Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1593108408993-58ee9c7825c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"62.99","rating":5.0,"number_of_reviews":17098},
    {"id":"16","name":"Mouse PB327","description":"Wireless Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80","price":"29.99","rating":5.0,"number_of_reviews":6793},
    {"id":"17","name":"Mouse KL7A","description":"Wireless Mouse.","image_url":"https://images.unsplash.com/flagged/photo-1561023367-4431103a484f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80","price":"11.99","rating":4.0,"number_of_reviews":2104},
    {"id":"18","name":"Laptop ASD4","description":"Laptop 17.3 inches 11th Gen Intel Core i5 16GB DDR4 RAM 1TB SSD Windows 11.","image_url":"https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80","price":"472","rating":4.5,"number_of_reviews":1205},
    {"id":"19","name":"Laptop XUU9","description":"Laptop 15.6 inches Full HD AMD Ryzen 3 335OU 4GB RAM DDR4.","image_url":"https://images.unsplash.com/photo-1595234336271-178875797b4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"649","rating":4.0,"number_of_reviews":987},
    {"id":"20","name":"Office Chair AG4","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://images.unsplash.com/photo-1580480095047-4aa43ab3bd1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","price":"204.99","rating":4.5,"number_of_reviews":617}
]

const local_en = {
    "search": "Search",
    "catalog": "Catalog",
    "cart": "Shopping Cart",
    "added_to_cart": "added to cart!",
    "cart_empty": "Your shopping cart is empty",
    "order_summary": "Order Summary",
    "search_result": "Search result",
    "see_more": "See more",
    "sign_out": "Sign out",
    "buy": "Buy",
    "price": "Price",
    "discount": "Discount",
    "shipping": "Shipping",
    "total": "Total",
    "something_went_wrong": "Something went wrong :(",
}

const local_pt = {
    "search": "Pesquisar",
    "catalog": "Catálogo",
    "cart": "Carrinho de Compras",
    "added_to_cart": "adicionado ao carrinho!",
    "cart_empty": "Seu carrinho de compras está vazio",
    "order_summary": "Resumo da Compra",
    "search_result": "Resultado da pesquisa",
    "see_more": "Ver mais",
    "sign_out": "Sair",
    "buy": "Comprar",
    "price": "Preço",
    "discount": "Desconto",
    "shipping": "Envio",
    "total": "Total",
    "something_went_wrong": "Algo deu errado :(",
}

const PAGE_SIZE = 10
let cart = []

export const fetchProducts = async (page) => {
    return new Promise((resolve, reject) => {
        resolve(dummyCatalog.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE))
    })
}

export const searchProducts = async (q) => {
    return new Promise((resolve, reject) => {
        resolve(dummyCatalog.slice(4, 8))
    })
}

export const fetchCart = async () => {
    return new Promise((resolve, reject) => {
        resolve(cart)
    })
}

export const addToCart = async (product) => {
    console.log('adding to cart: ' + product.id)
    cart.push(product)
    return new Promise((resolve, reject) => {
        resolve(cart)
    })
}

export const removeFromCart = async (key) => {
    cart.splice(key, 1) // 2nd parameter means remove one item only
    return new Promise((resolve, reject) => {
        resolve(cart)
    })
}

export const fetchCopy = async (language) => {
    const copy = language === "en" ? local_en : local_pt
    return new Promise((resolve, reject) => {
        resolve(copy)
    })
}
