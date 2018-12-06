import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import { styleConstants } from '../../shared/constants/styleConstants'
import frame from '../../assets/frame.svg'

const StyledUserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledUserCard = styled.section`
    margin: 15px;
    flex-grow: 1;
    min-width: 400px;
    cursor: pointer;

    .user {
        padding: 30px 10px;
        text-align: center;
        padding: 25px 10px;
    }

     .user__profile-picture-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
  }

  .profile-picture-frame {
    position: absolute;
    top: 35px;
    left: -56px;
    width: 182px;
  }

  .profile-picture-frame-piece {
    position: absolute;
    bottom: -7px;
    left: 28px;
    height: 15px;
    width: 15px;
  }

  .profile-picture--large {
    width: 70px;
    height: 70px;
  }

  .user__name {
    font-weight: bold;
    line-height: 26px;
    font-size: 18px;
    color: ${styleConstants.mainAccent};
  }

  .user__title {
      line-height: 18px;
        font-size: 14px;
    color: ${styleConstants.darkThemeLightText};
  }

  .user__title--padded {
    padding: 30px 0 0 0;
  }

  .user__progress {
    background: ${styleConstants.mainAccent};
    background: -moz-linear-gradient(left, ${styleConstants.mainAccent} 0%, ${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage}%, #2a2f39 ${props =>
  props.userTitleProgressPercentage}%, #2a2f39 100%);
    background: -webkit-linear-gradient(left, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage}%,#2a2f39 100%);
    background: linear-gradient(to right, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage}%,#2a2f39 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=${
      styleConstants.mainAccent
    }, endColorstr='#2a2f39',GradientType=1 );
    width: 40%;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 50px;
  }
  `

class UserCard extends PureComponent {
  constructor(props) {
    super(props)

    this.onUserSelect = this.onUserSelect.bind(this)
  }

  onUserSelect() {
    this.props.onUserSelect(this.props.user)
  }

  render() {
    const { user } = this.props

    return (
      <StyledUserCard
        userTitleProgressPercentage={user.userTitleProgressPercentage}
      >
        <div className="user" onClick={this.onUserSelect}>
          <div className="user__profile-picture-wrapper">
            <img
              className="profile-picture profile-picture--self profile-picture--large"
              src={user.userPicture}
              alt="profile"
            />
            <img className="profile-picture-frame" src={frame} alt="frame" />
            <img
              className="profile-picture-frame-piece"
              src={user.userFrame}
              alt="frame-content"
            />
          </div>
          <div className="user__name">{user.userName}</div>
          <div className="user__title">{user.userTitle}</div>
          <div className="user__title user__title--padded">
            {user.userLastTitle} <span className="user__progress" />{' '}
            {user.userNextTitle}
          </div>
        </div>
      </StyledUserCard>
    )
  }
}

UserCard.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    userName: propTypes.string.isRequired,
    // todo: add other.
  }).isRequired,
}

class UserDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.onUserSelect = this.onUserSelect.bind(this)
  }

  onUserSelect(selectedUser) {
    this.props.onUserSelect(selectedUser)
  }

  render() {
    const { users } = this.props

    return (
      <StyledUserDetails>
        {users &&
          users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onUserSelect={this.onUserSelect}
            />
          ))}
      </StyledUserDetails>
    )
  }
}

UserDetails.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      userName: propTypes.string.isRequired,
      // todo: add other.
    }).isRequired,
  ).isRequired,
  onUserSelect: propTypes.func.isRequired,
}

export default UserDetails
