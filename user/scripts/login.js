const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const poolData = {
    UserPoolId : process.env.COGNITO_POOL_ID,
    ClientId : process.env.COGNITO_CLIENT_ID
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

exports.handler = (username, password) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    })

    const userData = {
        Username : username,
        Pool : userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // console.log('ACCESS TOKEN: ' + result.getAccessToken().getJwtToken())
            console.log('ID TOKEN: ' + result.getIdToken().getJwtToken())
            // console.log('REFRESH TOKEN: ' + result.getRefreshToken().getToken())
        },
        onFailure: function(err) {
            console.log(err)
        },
    })
}
