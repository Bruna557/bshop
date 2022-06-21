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
    "cart_empty": "Your shopping cart is empty.",
    "order_summary": "Order Summary",
    "you_searched": "You searched",
    "see_more": "See more",
    "buy": "Buy",
    "price": "Price",
    "discount": "Discount",
    "shipping": "Shipping",
    "total": "Total",
    "something_went_wrong": "Something went wrong :(",
    "email": "Email",
    "password": "Password",
    "sign_in": "Sign in",
    "sign_out": "Sign out",
    "sign_in_success": "You are logged in!",
    "sign_in_failed": "Failed to authenticate.",
    "must_sign_in": "You need to sign in to use this feature.",
    "no_results": "There aren't any matches for your search :(",
}

const local_pt = {
    "search": "Pesquisar",
    "catalog": "Catálogo",
    "cart": "Carrinho de Compras",
    "added_to_cart": "adicionado ao carrinho!",
    "cart_empty": "Seu carrinho de compras está vazio.",
    "order_summary": "Resumo da Compra",
    "you_searched": "Você pesquisou",
    "see_more": "Ver mais",
    "buy": "Comprar",
    "price": "Preço",
    "discount": "Desconto",
    "shipping": "Envio",
    "total": "Total",
    "something_went_wrong": "Algo deu errado :(",
    "email": "Email",
    "password": "Senha",
    "sign_in": "Entrar",
    "sign_out": "Sair",
    "sign_in_success": "Você está logado!",
    "sign_in_failed": "Falha de autenticação.",
    "must_sign_in": "Você precisa estar logado para utilizar esta feature.",
    "no_results": "Não encontramos nenum resultado para sua busca :(",
}
