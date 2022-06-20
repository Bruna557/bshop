import { API_GATEWAY_URL } from "./config"

export const fetchCopy = async (language) => {
    let url = `${API_GATEWAY_URL}/localization?language=${language}`
    return fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => JSON.parse(data))
        .catch ((err) => {
            console.log(JSON.stringify(err))
        })
}
