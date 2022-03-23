import { toast } from 'react-toastify';

import { addToCart } from "../api";

export const addToCartFunc = (product, added_to_cart) => {
    addToCart(product);
    toast.success(`${product.name} ${added_to_cart}`);
}
