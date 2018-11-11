import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Admin from './components/admin/Admin'

const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/roster" component={Admin} />
  </Switch>
)

export default AppRouter
