import { API_GATEWAY_URL, API_KEY } from './config'

const BASE_URL = `${API_GATEWAY_URL}/cart`
const HEADERS = {
    'x-api-key': API_KEY
}

export const fetchCart = async () => {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('token'), ...HEADERS }
    })
        .then(response => response.json())
        .then(data => {
            return data.map((p) => JSON.parse(p.product))
        })
        .catch ((err) => {
            console.log('Error: unable to fetch cart', err)
        })
}

export const addToCart = async (product) => {
    return fetch(BASE_URL + `/${product.id}`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Authorization': localStorage.getItem('token'), ...HEADERS }
    })
        .catch ((err) => {
            console.log('Error: unable to add to cart', err)
        })
}

export const removeFromCart = async (id) => {
    return fetch(BASE_URL + `/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': localStorage.getItem('token'), ...HEADERS }
    })
        .catch ((err) => {
            console.log('Error: unable to remove from cart', err)
        })
}
