export default {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_AWS_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  API: {
    endpoints: [
      {
        name: 'users',
        endpoint: process.env.REACT_APP_API_USERS,
        region: process.env.REACT_APP_AWS_REGION,
      },
      {
        name: 'badges',
        endpoint: process.env.REACT_APP_API_BADGES,
        region: process.env.REACT_APP_AWS_REGION,
      },
    ],
  },
}
