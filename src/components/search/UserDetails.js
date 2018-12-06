import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Storage } from 'aws-amplify'

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
    background-size: cover;
    background-position: center;
    background-image: url(${props => JSON.stringify(props.userImage || '')})
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
} ${props => props.userTitleProgressPercentage || 0}%, #2a2f39 ${props =>
  props.userTitleProgressPercentage || 0}%, #2a2f39 100%);
    background: -webkit-linear-gradient(left, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage || 0}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage || 0}%,#2a2f39 100%);
    background: linear-gradient(to right, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage || 0}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage || 0}%,#2a2f39 100%);
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

class UserCard extends Component {
  state = {
    user: this.props.user,
  }

  constructor(props) {
    super(props)

    this.onUserSelect = this.onUserSelect.bind(this)
    this.setUserImage = this.setUserImage.bind(this)

    this.setUserImage()
  }

  componentDidUpdate() {
    if (this.props.user !== this.state.user) {
      this.setState({ user: this.props.user })

      this.setUserImage()
    }
  }

  // todo: extract to utility service.
  setUserImage() {
    const user = this.state.user

    if (!user.picture) {
      return
    }

    Storage.vault.get(user.picture, { level: 'public' }).then(res => {
      user.picture = res

      this.setState({ user })
    })
  }

  onUserSelect() {
    this.props.onUserSelect(this.props.user)
  }

  render() {
    const { user } = this.state

    return (
      <StyledUserCard {...user} userImage={user.picture}>
        <div className="user" onClick={this.onUserSelect}>
          <div className="user__profile-picture-wrapper">
            <div
              className={
                'profile-picture profile-picture--large profile-picture--self'
              }
            />
            {user && user.ladder && user.ladder.frame && (
              <img className="profile-picture-frame" src={frame} alt="frame" />
            )}
            {user && user.ladder && user.ladder.frame && (
              <img
                className="profile-picture-frame-piece"
                src={user.ladder.frame}
                alt="frame-content"
              />
            )}
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
    userId: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
    picture: propTypes.string,
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
              key={user.userId}
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
      userId: propTypes.string.isRequired,
      userName: propTypes.string.isRequired,
      picture: propTypes.string,
      // todo: add other.
    }).isRequired,
  ).isRequired,
  onUserSelect: propTypes.func.isRequired,
}

export default UserDetails
