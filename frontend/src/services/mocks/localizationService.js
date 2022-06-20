export const fetchCopy = async (language) => {
    const copy = language === "en" ? local_en : local_pt
    return new Promise((resolve, reject) => {
        resolve(copy)
    })
}

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
