import React from 'react'
import { AppConstants } from './constants/constants'
import Spinner from './Spinner'

const AuthSpinner = props => {
  return props.authState ===
    AppConstants.amplifyAuthActions.loading.awsState ? (
    <Spinner />
  ) : null
}

export default AuthSpinner
