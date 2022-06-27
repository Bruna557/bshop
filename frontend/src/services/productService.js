import { API_GATEWAY_URL, API_KEY } from './config'

const BASE_URL = `${API_GATEWAY_URL}/catalog`
const HEADERS = {
    'x-api-key': API_KEY
}

export const fetchProducts = async (page, size, q = null) => {
    let url = `${BASE_URL}?page=${page}&size=${size}`
    if (q) {
        url += `&q=${q}`
    }
    return fetch(url, {
        method: 'GET',
        headers: HEADERS
    })
        .then(response => response.json())
        .then(data => {
            return {
                products: data.hits.hits.map((p) => {
                    return {...{id: p._id}, ...p._source}
                }),
                total: data.hits.total.value
            }
        })
        .catch ((err) => {
            console.log('Error: unable to fetch products', err)
        })
}
