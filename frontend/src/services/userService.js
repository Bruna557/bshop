import { COGNITO_USER_POOL } from './config'

const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const userPool = new AmazonCognitoIdentity.CognitoUserPool(COGNITO_USER_POOL)

export const login = async (username, password) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    })

    const userData = {
        Username : username,
        Pool : userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    return new Promise((resolve, reject) =>
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                localStorage.setItem('token', result.getIdToken().getJwtToken())
                console.log(localStorage.getItem('token'))
                resolve(true)
            },
            onFailure: function(err) {
                console.log('Error: unable to log in', err)
                resolve(false)
            },
        })
    )
}

export const logout = () => {
    localStorage.setItem('token', null)
}
