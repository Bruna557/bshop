import { API_GATEWAY_URL } from './config'

const url = `${API_GATEWAY_URL}/cart`

export const fetchCart = async () => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.map((p) => JSON.parse(p.product))
        })
        .catch ((err) => {
            console.log(JSON.stringify(err))
        })
}

export const addToCart = async (product) => {
    return fetch(url + `/${product.id}`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .catch ((err) => {
            console.log(JSON.stringify(err))
        })
}

export const removeFromCart = async (id) => {
    return fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .catch ((err) => {
            console.log(JSON.stringify(err))
        })
}
