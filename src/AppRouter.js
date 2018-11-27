import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify'
import {
  Authenticator,
  SignUp,
  ConfirmSignUp,
  Greetings,
  ForgotPassword,
  RequireNewPassword,
} from 'aws-amplify-react'

import Dashboard from './components/dashboard/Dashboard'
import Admin from './components/admin/Admin'
import Login from './components/login/Login'
import { Constants } from '@aws-amplify/core'
import { AppConstants } from './shared/constants'

// const LoginGuard = ({ component: Component, ...rest }) => {
//   const isAuthenticated = true

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           Component !== Login ? (
//             <Component {...props} />
//           ) : (
//             <Redirect to="/" />
//           )
//         ) : Component === Login ? (
//           <Login location={{ state: props.location }} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   )
// }

const AppRouter = props => {
  const isAuthenticated =
    props.authState === AppConstants.amplifyAuthActions.signedIn.awsState

  return !isAuthenticated ? null : (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/admin" component={Admin} />
    </Switch>
  )
}

export default () => (
  <Authenticator hideDefault={true} style={{ background: 'red' }}>
    <Login />
    <AppRouter />
  </Authenticator>
)
