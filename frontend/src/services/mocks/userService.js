export const login = (username, password) => {
    let success = false
    if (username === 'bruna@gmail.com') {
        success = true
    }
    return new Promise((resolve, reject) => {
        resolve(success)
    })
}
