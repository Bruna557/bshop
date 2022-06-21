let cart = []

export const fetchCart = async () => {
    return new Promise((resolve, reject) => {
        resolve(cart)
    })
}

export const addToCart = async (product) => {
    cart.push(product)
    return new Promise((resolve, reject) => {
        resolve(cart)
    })
}

export const removeFromCart = async (id) => {
    cart = cart.filter((product) => product.id !== id)
    return new Promise((resolve, reject) => {
        resolve(true)
    })
}
