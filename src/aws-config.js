import { AppConstants } from './shared/constants/constants'

export default {
  Storage: {
    region: process.env.REACT_APP_AWS_REGION,
    bucket: process.env.REACT_APP_S3_BUCKET,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  },
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
        name: AppConstants.endpoints.users,
        endpoint: process.env.REACT_APP_API_USERS,
        region: process.env.REACT_APP_AWS_REGION,
      },
      {
        name: AppConstants.endpoints.badges,
        endpoint: process.env.REACT_APP_API_BADGES,
        region: process.env.REACT_APP_AWS_REGION,
      },
      {
        name: 'Self',
        endpoint: process.env.REACT_APP_API_SELF,
        region: process.env.REACT_APP_AWS_REGION,
      },
    ],
  },
}
