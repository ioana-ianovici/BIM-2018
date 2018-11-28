export const AppConstants = {
  amplifyAuthActions: {
    loading: { title: 'Loading...', awsState: 'loading' },
    signIn: { title: 'SIGN IN', awsState: 'signIn' },
    signUp: { title: 'SIGN UP', awsState: 'signUp' },
    confirmSignIn: { title: 'CONFIRM SIGN IN', awsState: 'confirmSignIn' },
    confirmSignUp: { title: 'CONFIRM SIGN UP', awsState: 'confirmSignUp' },
    verifyContact: { title: 'VERIFY', awsState: 'verifyContact' },
    forgotPassword: { title: 'CONFIRM', awsState: 'forgotPassword' },
    signedIn: { title: 'YOU ARE SIGNED IN', awsState: 'signedIn' },
  },
  amplifyErrorCodes: {
    userNotConfirmedException: 'UserNotConfirmedException',
  },
}
