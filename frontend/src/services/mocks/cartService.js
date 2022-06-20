let cart = []

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
