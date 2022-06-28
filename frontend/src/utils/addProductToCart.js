import { toast } from 'react-toastify'

import { addToCart } from '../services/cartService'

export const addProductToCart = (product, isLoggedIn, copy, navigate) => {
  if (isLoggedIn) {
      addToCart(product)
          .then(() => {
              toast.success(`${product.name} ${copy.added_to_cart}`)
          })
          .catch(() => toast.error(copy.something_went_wrong))
  } else {
      toast.error(copy.must_sign_in)
      navigate('/login')
  }
}
