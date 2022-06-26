const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const poolData = {
    UserPoolId : process.env.COGNITO_POOL_ID,
    ClientId : process.env.COGNITO_CLIENT_ID
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

exports.handler = (username, password) => {
    let attributeList = []
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:username}))
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err)
            return
        }
        cognitoUser = result.user
        console.log('Created user: ' + cognitoUser.getUsername())
    })
}
