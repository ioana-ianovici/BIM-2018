import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Admin from './components/admin/Admin'
import Login from './components/login/LoginComponent'

const LoginGuard = ({ component: Component, ...rest }) => {
  const isAuthenticated = true

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          Component !== Login ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : Component === Login ? (
          <Login location={{ state: props.location }} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const AppRouter = () => (
  <Switch>
    <LoginGuard exact path="/" component={Dashboard} />
    <LoginGuard exact path="/admin" component={Admin} />
    <LoginGuard exact path="/login" component={Login} />
  </Switch>
)

export default AppRouter
