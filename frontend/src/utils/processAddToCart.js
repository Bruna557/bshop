import { toast } from 'react-toastify'

import { addToCart } from '../services/mocks/cartService'

const processAddToCart = async (product, copy) => {
    const cart = await addToCart(product)
    if (cart) {
        toast.success(`${product.name} ${copy.added_to_cart}`)
    } else {
        toast.error(copy.something_went_wrong)
    }
}

export default processAddToCart
