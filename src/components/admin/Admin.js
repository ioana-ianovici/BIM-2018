import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'
import Pane from './Pane'
import UserAdministration from './UserAdministration'
import Badges from './Badges'
import Ladders from './Ladders'
import Frames from './Frames'
import Theme from './Theme'
import badge1 from '../../assets/badges/badge1.svg'
import badge2 from '../../assets/badges/badge2.svg'
import badge3 from '../../assets/badges/badge3.svg'
import badge4 from '../../assets/badges/badge4.svg'
import badge5 from '../../assets/badges/badge5.svg'
import badge6 from '../../assets/badges/badge6.svg'
import badge7 from '../../assets/badges/badge7.svg'
import badge8 from '../../assets/badges/badge8.svg'
import badge9 from '../../assets/badges/badge9.svg'
import badge10 from '../../assets/badges/badge10.svg'
import badge11 from '../../assets/badges/badge11.svg'
import badge12 from '../../assets/badges/badge12.svg'
import badge13 from '../../assets/badges/badge13.svg'
import { API } from 'aws-amplify'
import { Storage } from 'aws-amplify'

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
  defaultBadges = [
    {
      description: '',
      name: '',
      image: badge1,
    },
    {
      description: '',
      name: '',
      image: badge2,
    },
    {
      description: '',
      name: '',
      image: badge3,
    },
    {
      description: '',
      name: '',
      image: badge4,
    },
    {
      description: '',
      name: '',
      image: badge5,
    },
    {
      description: '',
      name: '',
      image: badge6,
    },
    {
      description: '',
      name: '',
      image: badge7,
    },
    {
      description: '',
      name: '',
      image: badge8,
    },
    {
      description: '',
      name: '',
      image: badge9,
    },
    {
      description: '',
      name: '',
      image: badge10,
    },
    {
      description: '',
      name: '',
      image: badge11,
    },
    {
      description: '',
      name: '',
      image: badge12,
    },
    {
      description: '',
      name: '',
      image: badge13,
    },
  ]

  state = {
    // todo: read from api.
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

    // badges: [
    //   { name: 'badge 1', image: null, id: 1 },
    //   { name: 'badge 2', image: null, id: 2 },
    //   { name: 'badge 3', image: null, id: 3 },
    //   { name: 'badge 4', image: null, id: 4 },
    //   { name: 'badge 5', image: null, id: 5 },
    //   { name: 'badge 6', image: null, id: 6 },
    // ],
    badges: [],

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

  constructor(props) {
    super(props)
  }

  render() {
    const { users, badges, ladders } = this.state

    return (
      <StyledAdmin>
        <Pane title="User Administration">
          <UserAdministration users={users} />
        </Pane>
        <Pane title="Badges">
          <Badges />
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
