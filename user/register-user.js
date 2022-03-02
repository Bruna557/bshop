const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
    UserPoolId : "us-east-1_VFQMeycgA",
    ClientId : "30vuuve6lcj5568gr979v32f7"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.handler = (username, password) => {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:username}));
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('Created user: ' + cognitoUser.getUsername());
    });
}
