const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
    UserPoolId : "us-east-1_VFQMeycgA",
    ClientId : "30vuuve6lcj5568gr979v32f7"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.handler = (username, password) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    });

    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token: ' + result.getAccessToken().getJwtToken());
            console.log('id token: ' + result.getIdToken().getJwtToken());
            console.log('refresh token: ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log(err);
        },
    });
}
