export default {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-west-1:d04e66fe-50d5-4c32-aedd-395721c252e9',

    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_c7EdEEuIx',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '5iqlsvr9908r3nc5rme8vg4uit',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
}
