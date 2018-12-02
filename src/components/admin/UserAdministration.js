import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import { styleConstants } from '../../shared/constants/styleConstants'
import ConfirmImage from '../../shared/images/Confirm.image'
import RemoveImage from '../../shared/images/Remove.image'

class ExistingUser extends PureComponent {
  render() {
    const { user, handleRemoveUser } = this.props

    return (
      <div className="users__user user">
        <img
          className="profile-picture profile-picture--medium"
          src={user.alt}
          alt={user.userName}
          title={user.userName}
        />
        <RemoveImage
          className="user__delete"
          onClick={() => handleRemoveUser(user)}
        />
      </div>
    )
  }
}

ExistingUser.propTypes = {
  user: propTypes.shape({
    isPending: propTypes.boolean,
    profileImage: propTypes.string,
    userName: propTypes.string,
    id: propTypes.id,
  }),
  handleRemoveUser: propTypes.func,
}

class PendingUser extends PureComponent {
  render() {
    const { user, handleRemoveUser, handleConfirmUser } = this.props

    return (
      <div className="users__user user">
        <img
          className="profile-picture profile-picture--medium"
          src={user.alt}
          alt={user.userName}
          title={user.userName}
        />
        <ConfirmImage
          className="user__confirm"
          onClick={() => handleConfirmUser(user)}
        />
        <RemoveImage
          className="user__delete"
          onClick={() => handleRemoveUser(user)}
        />
      </div>
    )
  }
}

PendingUser.propTypes = {
  user: propTypes.shape({
    isPending: propTypes.boolean,
    profileImage: propTypes.string,
    userName: propTypes.string,
    id: propTypes.id,
  }),
  handleRemoveUser: propTypes.func,
  handleConfirmUser: propTypes.func,
}

const StyledUserAdministration = styled.div`
  .users {
    display: flex;
  }

  .users__existing-users {
    margin-right: 20px;
    width: 50%;
  }

  .users__pending-users {
    width: 50%;
  }

  .users__wrapper {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .user {
    width: 60px;
    margin-right: 20px;
    margin-bottom: 35px;
    position: relative;
  }

  .user__delete {
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: -5px;
    left: -5px;
    background-color: ${styleConstants.darkThemeSecondaryBackground};
  }

  .user__confirm {
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: -5px;
    background-color: ${styleConstants.darkThemeSecondaryBackground};
  }
`

class UserAdministration extends PureComponent {
  handleConfirmUser(user) {
    console.log('confirm,', user.id)
    // todo: call api.
  }

  handleRemoveUser(user) {
    console.log('remove,', user.id)
    // todo: call api.
  }

  render() {
    const { users } = this.props

    return (
      <StyledUserAdministration>
        <div className="users">
          <div className="users__existing-users">
            <h3>Existing</h3>
            <div className="users__wrapper">
              {users
                .filter(user => !user.isPending)
                .map(user => (
                  <ExistingUser
                    key={user.id}
                    user={user}
                    handleRemoveUser={this.handleRemoveUser}
                  />
                ))}
            </div>
          </div>
          <div className="users__pending-users">
            <h3>Pending</h3>
            <div className="users__wrapper">
              {users
                .filter(user => user.isPending)
                .map(user => (
                  <PendingUser
                    key={user.id}
                    user={user}
                    handleRemoveUser={this.handleRemoveUser}
                    handleConfirmUser={this.handleConfirmUser}
                  />
                ))}
            </div>
          </div>
        </div>
      </StyledUserAdministration>
    )
  }
}

UserAdministration.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      isPending: propTypes.boolean,
      profileImage: propTypes.string,
      userName: propTypes.string,
      id: propTypes.id,
    }),
  ),
}

export default UserAdministration
