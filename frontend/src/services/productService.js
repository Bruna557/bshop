import { API_GATEWAY_URL } from './config'

export const fetchProducts = async (page, size, q = null) => {
    let url = `${API_GATEWAY_URL}/catalog?page=${page}&size=${size}`
    if (q) {
        url += `&q=${q}`
    }
    return fetch(url, { method: 'GET' })
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
