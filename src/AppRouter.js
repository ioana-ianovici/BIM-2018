import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Authenticator } from 'aws-amplify-react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Logout from './shared/Logout'
import PageLayout from './shared/PageLayout'
import AuthSpinner from './shared/AuthSpinner'
import Dashboard from './components/dashboard/Dashboard'
import Settings from './components/settings/Settings'
import Search from './components/search/Search'
import Admin from './components/admin/Admin'
import Login from './components/login/Login'
import { AppConstants } from './shared/constants/constants'

const StyledRoutesGuard = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 200ms ease-in;
  }

  .transition-group {
    position: relative;
  }

  .route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`

const RoutesGuard = props => {
  const isAuthenticated =
    props.authState === AppConstants.amplifyAuthActions.signedIn.awsState

  return !isAuthenticated ? null : (
    <StyledRoutesGuard>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={props.location.key}
          timeout={{ enter: 400, exit: 200 }}
          classNames="fade"
        >
          <div className="route-section">
            <Switch location={props.location}>
              <Route
                exact
                path={AppConstants.routes.dashboard}
                component={Dashboard}
              />
              <Route exact path={AppConstants.routes.admin} component={Admin} />
              <Route
                exact
                path={AppConstants.routes.search}
                component={Search}
              />
              <Route
                exact
                path={AppConstants.routes.settings}
                component={Settings}
              />
              <Route
                exact
                path={AppConstants.routes.logout}
                component={Logout}
              />
              <Route
                exact
                path={AppConstants.routes.dashboard}
                component={Dashboard}
              />
              <Route
                exact
                path="/"
                component={() => (
                  <Redirect to={AppConstants.routes.dashboard} />
                )}
              />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </StyledRoutesGuard>
  )
}

const RoutesGuardHoC = withRouter(RoutesGuard)

const Intermediary = props => (
  <PageLayout>
    <AuthSpinner {...props} />
    <RoutesGuardHoC {...props} />
  </PageLayout>
)

const AppRouter = () => (
  <Authenticator hideDefault={true} style={{ background: 'red' }}>
    <Login />
    <Intermediary />
  </Authenticator>
)

export default AppRouter
