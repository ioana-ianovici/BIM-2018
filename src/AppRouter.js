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
import awsConfig from './aws-config'

import Dashboard from './components/dashboard/Dashboard'
import Admin from './components/admin/Admin'
import Login from './components/login/Login'

Amplify.configure(awsConfig)

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

class AppRouter extends React.PureComponent {
  state = {
    isAuthenticated: false,
  }

  constructor(props) {
    super(props)
    console.log('props auth state', props.authState)
    this.setState({ isAuthenticated: Auth.user != null })
  }

  render() {
    return !this.state.isAuthenticated ? null : (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    )
  }
}

export default () => (
  <Authenticator hideDefault={true} style={{ background: 'red' }}>
    <Login />
    <SignUp />
    <ConfirmSignUp />
    <Greetings />
    <AppRouter />
  </Authenticator>
)
