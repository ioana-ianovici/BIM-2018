import React, { Component } from 'react'
import styled from 'styled-components'
import { API, Storage } from 'aws-amplify'

import { styleConstants } from '../../shared/constants/styleConstants'
import { AppConstants } from '../../shared/constants/constants'
import Pane from './Pane'
import UserAdministration from './UserAdministration'
import Badges from './Badges'
import Ladders from './Ladders'
import Frames from './Frames'
import Theme from './Theme'

const StyledAdmin = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  h2 {
    font-weight: 300;
    line-height: 31px;
    font-size: 21px;
    text-transform: uppercase;
    color: ${styleConstants.mainAccent};
    margin: 0;
    margin-bottom: 20px;
    padding: 0;
  }

  h3 {
    font-weight: 300;
    line-height: 23px;
    text-transform: uppercase;
    font-size: 16px;
    margin: 0;
    margin-bottom: 15px;
  }

  section {
    padding: 25px 40px;
  }
`

class Admin extends Component {
  state = {
    users: [],
    ladders: [],
  }

  constructor(props) {
    super(props)

    this.getUsers = this.getUsers.bind(this)

    this.getUsers()
  }

  getUsers() {
    // todo: implement pending functionality. (now there are no pending users ever)
    API.get(AppConstants.endpoints.users, '').then(users => {
      Promise.all(
        users.map(user => {
          Storage.vault
            .get(user.picture, { level: 'public' })
            .then(img => (user.picture = img))
        }),
      ).then(() => {
        this.setState({ users })
      })
    })
  }

  render() {
    const { users } = this.state

    return (
      <StyledAdmin>
        <Pane title="User Administration">
          <UserAdministration users={users} handleUserChange={this.getUsers} />
        </Pane>
        <Pane title="Badges">
          <Badges />
        </Pane>
        <Pane title="Ladders">
          <Ladders users={users.filter(user => !user.isPending)} />
        </Pane>
        <Pane title="Frames">
          <Frames />
        </Pane>
        <Pane title="Theme">
          <Theme />
        </Pane>
      </StyledAdmin>
    )
  }
}

export default Admin
