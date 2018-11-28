import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Authenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

import Dashboard from './components/dashboard/Dashboard'
import Spinner from './shared/Spinner'
import Admin from './components/admin/Admin'
import Login from './components/login/Login'
import { AppConstants } from './shared/constants'

const Routes = props => {
  const isAuthenticated =
    props.authState === AppConstants.amplifyAuthActions.signedIn.awsState

  return !isAuthenticated ? null : (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/admin" component={Admin} />
      <Route
        exact
        path="/logout"
        component={() => {
          Auth.signOut()
            .catch(err => {
              console.log(err)
            })
            .then(() => {
              const url = window.location.href
              window.location.href = url.slice(0, url.indexOf('/logout'))
            })

          return null
        }}
      />
    </Switch>
  )
}

const AuthSpinner = props => {
  return props.authState ===
    AppConstants.amplifyAuthActions.loading.awsState ? (
    <Spinner />
  ) : null
}

const AppRouter = () => (
  <Authenticator hideDefault={true} style={{ background: 'red' }}>
    <Login />
    <AuthSpinner />
    <Routes />
  </Authenticator>
)

export default AppRouter
