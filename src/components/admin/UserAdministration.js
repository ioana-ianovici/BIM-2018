import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { API } from 'aws-amplify'

import { styleConstants } from '../../shared/constants/styleConstants'
import { AppConstants } from '../../shared/constants/constants'
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
    picture: propTypes.string,
    userName: propTypes.string,
    userId: propTypes.string,
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
    picture: propTypes.string,
    userName: propTypes.string,
    userId: propTypes.string,
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
  constructor(props) {
    super(props)

    this.handleRemoveUser = this.handleRemoveUser.bind(this)
    this.handleConfirmUser = this.handleConfirmUser.bind(this)
  }

  handleConfirmUser(user) {
    console.log('confirm,', user.userId)
    // todo: call api.
  }

  handleRemoveUser(user) {
    API.del(AppConstants.endpoints.users, `/${user.userId}`).then(() => {
      this.props.handleUserChange()
    })
  }

  render() {
    const { users } = this.props
    const isPendingUsers = users.find(user => user.isPending)

    return (
      <StyledUserAdministration>
        <div className="users">
          <div className="users__existing-users">
            {isPendingUsers && <h3>Existing</h3>}
            <div className="users__wrapper">
              {users
                .filter(user => !user.isPending)
                .map(user => (
                  <ExistingUser
                    key={user.userId}
                    user={user}
                    handleRemoveUser={this.handleRemoveUser}
                  />
                ))}
            </div>
          </div>
          {isPendingUsers && (
            <div className="users__pending-users">
              <h3>Pending</h3>
              <div className="users__wrapper">
                {users
                  .filter(user => user.isPending)
                  .map(user => (
                    <PendingUser
                      key={user.userId}
                      user={user}
                      handleRemoveUser={this.handleRemoveUser}
                      handleConfirmUser={this.handleConfirmUser}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </StyledUserAdministration>
    )
  }
}

UserAdministration.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      isPending: propTypes.boolean, // todo: will be required.
      picture: propTypes.string,
      userName: propTypes.string,
      userId: propTypes.string.isRequired,
    }),
  ),
  handleUserChange: propTypes.func.isRequired,
}

export default UserAdministration
