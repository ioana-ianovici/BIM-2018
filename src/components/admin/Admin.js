import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'
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
    users: [
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 1 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 2 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 3 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 4 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 5 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 6 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 7 },
      { profileImage: 'lala', userName: 'user name', isPending: true, id: 8 },
      {
        profileImage: 'lala',
        userName: 'user name 1',
        isPending: false,
        id: 9,
      },
      {
        profileImage: 'lala',
        userName: 'user name 2',
        isPending: false,
        id: 10,
      },
      {
        profileImage: 'lala',
        userName: 'user name 3',
        isPending: false,
        id: 11,
      },
      {
        profileImage: 'lala',
        userName: 'user name 4',
        isPending: false,
        id: 12,
      },
      {
        profileImage: 'lala',
        userName: 'user name 5',
        isPending: false,
        id: 13,
      },
      {
        profileImage: 'lala',
        userName: 'user name 6',
        isPending: false,
        id: 14,
      },
      {
        profileImage: 'lala',
        userName: 'user name 7',
        isPending: false,
        id: 15,
      },
      {
        profileImage: 'lala',
        userName: 'user name 8',
        isPending: false,
        id: 16,
      },
      {
        profileImage: 'lala',
        userName: 'user name 9',
        isPending: false,
        id: 17,
      },
    ],

    selectedDefaultSet: 'Default Set 1',

    badges: [
      { name: 'badge 1', image: null, id: 1 },
      { name: 'badge 2', image: null, id: 2 },
      { name: 'badge 3', image: null, id: 3 },
      { name: 'badge 4', image: null, id: 4 },
      { name: 'badge 5', image: null, id: 5 },
      { name: 'badge 6', image: null, id: 6 },
    ],

    ladders: [
      {
        id: 1,
        name: 'Developer',
        steps: [
          {
            id: 1,
            name: 'ASSIST Intern',
            frame: 'frame',
            requirements: [
              { id: 1, text: 'some requirement' },
              { id: 2, text: 'some requirement 2' },
              { id: 3, text: 'some requirement 3' },
            ],
          },
          {
            id: 2,
            name: 'SDE 1',
            frame: 'frame',
            requirements: [
              { id: 4, text: 'some requirement' },
              { id: 5, text: 'some requirement 2' },
              { id: 6, text: 'some requirement 3' },
            ],
          },
          {
            id: 3,
            name: 'SDE 2',
            frame: 'frame',
            requirements: [
              { id: 7, text: 'some requirement' },
              { id: 8, text: 'some requirement 2' },
              { id: 9, text: 'some requirement 3' },
            ],
          },
          {
            id: 4,
            name: 'SDE 3',
            frame: 'frame',
            requirements: [
              { id: 10, text: 'some requirement' },
              { id: 11, text: 'some requirement 2' },
              { id: 12, text: 'some requirement 3' },
            ],
          },
        ],
        members: [
          { profileImage: 'lala', userName: 'user name 1', id: 9 },
          { profileImage: 'lala', userName: 'user name 2', id: 10 },
          { profileImage: 'lala', userName: 'user name 3', id: 11 },
          { profileImage: 'lala', userName: 'user name 4', id: 12 },
          { profileImage: 'lala', userName: 'user name 5', id: 13 },
          { profileImage: 'lala', userName: 'user name 6', id: 14 },
          { profileImage: 'lala', userName: 'user name 7', id: 15 },
        ],
      },
    ],
  }

  render() {
    const { users, selectedDefaultSet, badges, ladders } = this.state

    return (
      <StyledAdmin>
        <Pane title="User Administration">
          <UserAdministration users={users} />
        </Pane>
        <Pane title="Badges">
          <Badges selectedDefaultSet={selectedDefaultSet} badges={badges} />
        </Pane>
        <Pane title="Ladders">
          <Ladders
            ladders={ladders}
            users={users.filter(user => !user.isPending)}
          />
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
