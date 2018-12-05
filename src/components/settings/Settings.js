import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { API } from 'aws-amplify'

import { styleConstants } from './../../shared/constants/styleConstants'

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
    margin: 50px auto;
    display: block;
    text-align: center;
    position: relative;
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
    isNewUser: false,
    userPicture: null,
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

    this.loadUserData()
  }

  loadUserData() {
    API.get('Self', '', {})
      .then(response => {
        this.setState({
          userName: response.userName,
          userPicture: response.picture,
        })
      })
      .catch(err => {
        this.setState({ isNewUser: true })
        console.log(err)
      })
  }

  handleFileChange(event) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    this.generatePreviewImgUrl(file, userPicture => {
      this.setState({ userPicture })
    })

    if (this.state.isNewUser) {
      const body = {
        userName: this.state.userName,
        picture: this.state.userPicture,
      }
      API.post('Users', '', { body })
        .then(() => {
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // todo: call api to update user details.
    }
  }

  handleUserNameChange(event) {
    const oldUserName = this.state.userName
    this.setState({ userName: event.target.value })

    if (this.isDebounce) {
      return
    }

    event.persist()

    this.isDebounce = true

    setTimeout(() => {
      if (this.state.userName !== oldUserName) {
        this.isDebounce = false
        this.handleUserNameChange(event)
        return
      }

      if (this.state.isNewUser) {
        const body = {
          userName: event.target.value,
          picture: this.state.userPicture,
        }
        API.post('Users', '', { body })
          .then(() => {
            window.location.reload()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // todo: call api to update user details.
      }

      this.isDebounce = false
    }, 1000)
  }

  handleResetPassword() {
    if (this.state.isNewUser) {
      const body = {
        userName: this.state.userName,
        picture: this.state.userPicture,
      }
      API.post('Users', '', { body })
        .then(() => {
          this.loadUserData()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // todo: call api to update user details.
    }
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
    const { userPicture, userName } = this.state

    return (
      <StyledSettings>
        <div className="user-image">
          {/* todo: add alt */}
          <img src={userPicture} alt="" />
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
