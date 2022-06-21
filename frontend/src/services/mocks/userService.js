export const login = (username, password) => {
    let success = false
    if (password === '1234') {
        success = true
    }
    return new Promise((resolve, reject) => {
        resolve(success)
    })
}

export const logout = () => {
    return
}
