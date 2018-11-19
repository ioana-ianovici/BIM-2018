import React from 'react'
import loginImage from './../../assets/login-image.jpg'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import PageWrapper from './../../shared/PageContainer'
import { styleConstants } from './../../shared/styleConstants'

const StyledLogin = styled(PageWrapper)`
  background: ${styleConstants.mainColor} url(${loginImage}) no-repeat left
    center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  .login {
    min-width: 30%;
    background-color: #fff;
    padding: 60px 50px;

    .login__nav-links-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 60px;
    }

    .login__nav-link {
      background: transparent;
      border: none;
      padding: 0 50px 10px;
      text-decoration: none;
      font-weight: bold;
      line-height: 31px;
      font-size: 21px;
      color: rgba(80, 93, 104, 0.5);
      text-align: center;

      &:hover {
        color: #505d68;
      }
      &:focus {
        outline: none;
      }

      &.active {
        color: #505d68;
        border-bottom: 1px solid ${styleConstants.mainAccent};
      }
    }

    .login__form-group {
      margin-bottom: 60px;

      .login-form__input {
        border-radius: 2px;
        display: block;
        width: 100%;
        border: 1px solid #c2d1d9;
        padding: 15px;
        margin-bottom: 15px;
        line-height: 18px;
        font-size: 14px;
        color: #c2d1d9;
      }

      .login-form__forgot-password {
        line-height: 21px;
        font-size: 14px;
        color: #a1aeb7;
        text-decoration: none;
        background: transparent;
        border: none;
      }
    }

    .login__submit {
      border: none;
      display: block;
      cursor: pointer;
      background: ${styleConstants.mainAccent};
      text-align: center;
      color: #fff;
      font-size: 12px;
      text-transform: uppercase;
      width: 100%;
      padding: 15px 5px;
    }
  }
`

class Login extends React.Component {
  stateActions = {
    signIn: 'SIGN IN',
    signUp: 'SIGN UP',
    forgotPassword: 'FORGOT PASSWORD',
  }
  state = {
    redirectToReferrer: false,
    action: this.stateActions.signIn,
  }
  login() {
    // todo.
    this.setState(() => ({
      redirectToReferrer: true,
    }))
  }
  handleStateActionChange(action) {
    this.setState({ action: action })
  }
  handleSubmit() {
    switch (this.state.action) {
      case this.stateActions.signIn: {
        break
      }
      case this.stateActions.signUp: {
        break
      }
      case this.stateActions.forgotPassword: {
        break
      }
      default: {
        break
      }
    }
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, action } = this.state
    console.log(action)
    const isSignIn = action === this.stateActions.signIn
    const isSignUp = action === this.stateActions.signUp
    const isForgotPassword = action === this.stateActions.forgotPassword

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <StyledLogin>
        <div className="login">
          <div className="login__nav-links-wrapper">
            <button
              onClick={() =>
                this.handleStateActionChange(this.stateActions.signIn)
              }
              className={'login__nav-link ' + (isSignIn ? 'active' : '')}
            >
              Sign in
            </button>
            <button
              onClick={() =>
                this.handleStateActionChange(this.stateActions.signUp)
              }
              className={'login__nav-link ' + (isSignUp ? 'active' : '')}
            >
              Sign up
            </button>
          </div>
          <div className="login__form-group login-form">
            <input
              type="email"
              className="login-form__input"
              placeholder="Email"
            />
            {!isForgotPassword && (
              <input
                type="password"
                className="login-form__input"
                placeholder="Password"
              />
            )}
            {isSignIn && (
              <button
                onClick={() =>
                  this.handleStateActionChange(this.stateActions.forgotPassword)
                }
                className="login-form__forgot-password"
              >
                Forgot your password?
              </button>
            )}
          </div>
          <button className="login__submit">{this.state.action}</button>
        </div>
      </StyledLogin>
    )
  }
}

export default Login
