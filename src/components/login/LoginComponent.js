import React from 'react'
import loginImage from './../../assets/login-illustration.svg'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import PageWrapper from './../../shared/PageContainer'
import { styleConstants } from './../../shared/styleConstants'
import { Logo } from '../../shared/Logo'

const StyledLogin = styled(PageWrapper)`
  background: ${styleConstants.mainColor} url(${loginImage}) no-repeat left
    center;
  background-size: contain;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  overflow: auto;

  @media screen and (max-width: 800px) {
    align-items: center;
    justify-content: space-evenly;
  }

  .login__container {
    margin: 0 7%;
    position: relative;

    @media screen and (max-width: 1000px) {
      margin: 0 5%;
    }

    @media screen and (max-width: 700px) {
      margin: 0 2%;
    }
  }

  .login__logo {
    text-align: center;
    margin-bottom: 30px;
  }

  .login-box {
    min-width: 30%;
    background-color: #fff;
    padding: 60px 50px;

    .login-box__nav-links-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 60px;
    }

    .login-box__nav-link {
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

    .login-box__form-group {
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

    .login-box__submit {
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
    const isSignIn = action === this.stateActions.signIn
    const isSignUp = action === this.stateActions.signUp
    const isForgotPassword = action === this.stateActions.forgotPassword

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <StyledLogin className="login">
        <div className="login__container">
          <div className="login__login-box-wrapper">
            <div className="login__logo">
              <Logo scale="0.8" />
            </div>
            <div className="login-box">
              <div className="login-box__nav-links-wrapper">
                <button
                  onClick={() =>
                    this.handleStateActionChange(this.stateActions.signIn)
                  }
                  className={
                    'login-box__nav-link ' + (isSignIn ? 'active' : '')
                  }
                >
                  Sign in
                </button>
                <button
                  onClick={() =>
                    this.handleStateActionChange(this.stateActions.signUp)
                  }
                  className={
                    'login-box__nav-link ' + (isSignUp ? 'active' : '')
                  }
                >
                  Sign up
                </button>
              </div>
              <form className="login-box__form-group login-form">
                <input
                  type="email"
                  className="login-form__input"
                  placeholder="Email"
                  autoComplete="off"
                />
                {!isForgotPassword && (
                  <input
                    type="password"
                    className="login-form__input"
                    placeholder="Password"
                    autoComplete="off"
                  />
                )}
                {isSignIn && (
                  <button
                    onClick={() =>
                      this.handleStateActionChange(
                        this.stateActions.forgotPassword
                      )
                    }
                    className="login-form__forgot-password"
                  >
                    Forgot your password?
                  </button>
                )}
              </form>
              <button className="login-box__submit">{this.state.action}</button>
            </div>
          </div>
        </div>
      </StyledLogin>
    )
  }
}

export default Login
