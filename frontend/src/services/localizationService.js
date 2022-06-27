import { API_GATEWAY_URL, API_KEY } from './config'

const BASE_URL = `${API_GATEWAY_URL}/localization`
const HEADERS = {
    'x-api-key': API_KEY
}

export const fetchCopy = async (language) => {
    const url = `${BASE_URL}?lang=${language}`
    return fetch(url, {
        method: 'GET',
        headers: HEADERS
    })
        .then(response => response.json())
        .then(data => JSON.parse(data))
        .catch ((err) => {
            console.log('Error: unable to fetch copy', err)
        })
}
