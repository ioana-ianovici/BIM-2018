import React, { Component } from 'react'
import AppRouter from './AppRouter'
import Amplify from 'aws-amplify'
import awsConfig from './aws-config'

Amplify.configure(awsConfig)

class App extends Component {
  render() {
    return <AppRouter />
  }
}

export default App
