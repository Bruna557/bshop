const dummyCatalog = [
    {"name":"Headset X532","description":"Premium gaming headset for PC and consoles (PS4 and Xbox); exceptional sound quality with high-frequency response and extra bass.","image_url":"https://images.unsplash.com/photo-1600186279172-fdbaefd74383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80","price":"66.61","rating":4,"number_of_reviews":345},
    {"name":"Headset MF41","description":"Wireless Bluetooth gaming headset for PC PS4 PS5 Playstation.","image_url":"https://images.unsplash.com/photo-1565876480410-91009978e5b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80","price":"36.54","rating":4.5,"number_of_reviews":2972},
    {"name":"Keyboard X1","description":"Gaming keyboard RGB illumination water resistant.","image_url":"https://images.unsplash.com/photo-1626958390898-162d3577f293?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"104.99","rating":4.5,"number_of_reviews":13792},
    {"name":"Keyboard XSM","description":"Basic wireless keyboard US-Layout (QWERTY).","image_url":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80","price":"22.38","rating":3.5,"number_of_reviews":322},
    {"name":"Mouse AA37","description":"High Performance Wired Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1593108408993-58ee9c7825c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"39.99","rating":4.0,"number_of_reviews":28057},
    {"name":"Mouse PB327","description":"Wireless Gaming Mouse.","image_url":"https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80","price":"29.99","rating":5.0,"number_of_reviews":6793},
    {"name":"Mouse 82LO","description":"Wireless Mouse.","image_url":"https://images.unsplash.com/flagged/photo-1561023367-4431103a484f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80","price":"10.98","rating":3.0,"number_of_reviews":437},
    {"name":"Laptop HJ22","description":"Laptop 17.3 inches 11th Gen Intel Core i5 16GB DDR4 RAM 1TB SSD Windows 11.","image_url":"https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80","price":"369","rating":4.0,"number_of_reviews":837},
    {"name":"Laptop X977U","description":"Laptop 15.6 inches Full HD AMD Ryzen 3 335OU 4GB RAM DDR4.","image_url":"https://images.unsplash.com/photo-1595234336271-178875797b4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","price":"799","rating":5.0,"number_of_reviews":2849},
    {"name":"Office Chair RD2D","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://images.unsplash.com/photo-1580480095047-4aa43ab3bd1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","price":"191.66","rating":4.0,"number_of_reviews":412}
]

const en = {
    "search": "Search",
    "catalog": "Catalog",
    "search_result": "Search result",
    "see_more": "See more",
    "sign_out": "Sign out",
}

const pt = {
    "search": "Pesquisar",
    "catalog": "Catálogo",
    "search_result": "Resultado da pesquisa",
    "see_more": "Ver mais",
    "sign_out": "Sair",
}

let cart = [];

export const getProducts = () => {
    return dummyCatalog;
}

export const search = (q) => {
    console.log("search: " + q);
    return dummyCatalog.slice(4, 8);
}

export const getCart = () => {
    console.log("returning cart with " + cart.length + " products")
    return cart;
}

export const addToCart = (product) => {
    console.log("product added to cart: " + product.name)
    cart.push(product);
    console.log("now there are " + cart.length + " products in the cart")
}

export const removeFromCart = (key) => {
    cart.splice(key, 1); // 2nd parameter means remove one item only
}

export const getCopy = (language) => {
    return language === "pt" ? pt : en;
}
