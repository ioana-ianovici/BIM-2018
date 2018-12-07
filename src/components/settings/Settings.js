import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { API } from 'aws-amplify'

import { styleConstants } from './../../shared/constants/styleConstants'
import { AppConstants } from './../../shared/constants/constants'
import { s3Upload } from '../admin/awsStorage'

const StyledSettings = styled.div`
  h2 {
    font-weight: 300;
    line-height: 31px;
    font-size: 21px;
    text-transform: uppercase;
    color: ${styleConstants.mainAccent};
    margin: 0;
    padding: 0;
    position: absolute;
    left: 20px;
    top: 30px;
  }

  input {
    width: 400px;
    text-align: center;
    padding: 15px;
    border: none;
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    display: block;
    margin: 0 auto 10px auto;

    &:focused {
      outline: none;
      border-bottom: 1px solid ${styleConstants.mainAccent};
    }
  }

  .user-image {
    margin: 50px auto 100px auto;
    display: block;
    text-align: center;
    position: relative;
  }

  .profile-picture {
    border: 1px solid ${styleConstants.darkThemeLightText};
  }

  .user-image__upload {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
  }

  .user-image__upload-label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 18px;
    font-size: 14px;
    cursor: pointer;
    color: ${styleConstants.darkThemeLightText};
    padding-top: 140px;
    display: block;
  }

  .edit-name {
    padding: 25px 20px;
  }

  .edit-name__input {
    line-height: 31px;
    font-size: 20px;
    color: ${styleConstants.darkThemeLightText};
  }

  .reset-password {
    padding: 40px 20px 30px 20px;
  }

  .reset-password__input {
    line-height: 18px;
    font-size: 14px;
  }

  .reset-password__submit {
    display: block;
    margin: 50px auto auto;
  }
`

class Settings extends PureComponent {
  state = {
    userId: null,
    // todo: replace isNewUser with id.
    isNewUser: false,
    userPicture: null,
    userImage: null,
    userName: null,
    password: null,
    newPassword: null,
    confirmNewPassword: null,
  }

  constructor(props) {
    super(props)

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this)

    this.loadUserData()
  }

  loadUserData() {
    API.get(AppConstants.endpoints.self, '', {})
      .then(response => {
        this.setState({
          userId: response.userId,
          userName: response.userName,
          userPicture: response.picture,
        })
      })
      .catch(err => {
        this.setState({ isNewUser: true })
        console.log(err)
      })
  }

  updateUserDetails() {
    const { userName, userPicture, userId } = this.state
    const body = {
      userName,
      picture: userPicture,
    }

    API.put('Users', `/${userId}`, { body })
      .then(res => {
        console.log('user details updated')
        window.location.reload()
      })
      .catch(err => {
        console.log('could not update user details', err)
      })
  }

  createUser() {
    const { userName, userPicture } = this.state

    if (!userName || !userPicture) {
      return
    }

    const body = {
      userName,
      picture: userPicture,
    }
    API.post('Users', '', { body }).then(() => {
      window.location.reload()
    })
  }

  async handleFileChange(event) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    } else {
      // this.generatePreviewImgUrl(file, userImage => {
      //   this.setState({ userImage })
      // })
      console.log('new picture selected')
      const filename = await s3Upload(file)
      this.setState({ userPicture: filename })
    }

    if (!this.state.userId) {
      this.createUser()
    } else {
      this.updateUserDetails()
    }
  }

  handleUserNameChange(event) {
    this.setState({ userName: event.target.value })
  }

  handleUserNameSubmit() {
    if (!this.state.userId) {
      this.createUser()
    } else {
      this.updateUserDetails()
    }
  }

  handleResetPassword() {
    // todo: de facut password reset cu cognito
    // parola se reseteaza cu cognito, nu din user details
  }

  generatePreviewImgUrl(file, callback) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => callback(reader.result)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { userName } = this.state

    return (
      <StyledSettings>
        <div className="user-image">
          <div className="profile-picture profile-picture--self profile-picture--large" />
          <input
            autoComplete="off"
            id="upload-user-picture"
            type="file"
            accept="image/*"
            multiple={false}
            className="user-image__upload"
            onChange={this.handleFileChange}
          />
          <label
            className="user-image__upload-label"
            htmlFor="upload-user-picture"
            title="Upload user picture"
          >
            Change profile picture
          </label>
        </div>
        <section className="edit-name">
          <h2>Name</h2>
          <input
            type="text"
            className="edit-name__input"
            onChange={this.handleUserNameChange}
            onBlur={this.handleUserNameSubmit}
            value={userName || ''}
            placeholder="Your name"
            name="userName"
          />
        </section>
        <section className="reset-password">
          <h2>Reset password</h2>
          <form>
            <input
              type="password"
              autoComplete="off"
              className="reset-password__input"
              name="password"
              placeholder="Old password"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              autoComplete="off"
              className="reset-password__input"
              name="newPassword"
              placeholder="New password"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              autoComplete="off"
              className="reset-password__input"
              name="confirmNewPassword"
              placeholder="New password"
              onChange={this.handleInputChange}
            />
            <button
              type="submit"
              disabled={
                !(
                  this.state.password &&
                  this.state.newPassword &&
                  this.state.confirmNewPassword
                )
              }
              className="reset-password__submit"
            >
              UPDATE
            </button>
          </form>
        </section>
      </StyledSettings>
    )
  }
}

export default Settings
