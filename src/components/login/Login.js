import React, { Fragment } from 'react'
import loginImage from './../../assets/login-illustration.svg'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { Auth } from 'aws-amplify'
import { styleConstants } from '../../shared/constants/styleConstants'
import { Logo } from '../../shared/Logo'
import { AppConstants } from '../../shared/constants/constants'

const StyledLogin = styled.div`
  height: 100%;
  padding: 7% 7%;
  margin: auto;
  /* background: ${styleConstants.mainColor} url(${loginImage}) no-repeat left
    center; */
  /* todo */
  background: ${styleConstants.darkThemePrimaryBackground};
  background-size: contain;
  overflow: auto;

  @media screen and (max-width: 1000px) {
    padding: 0 5%;
    margin: auto;
  }

  @media screen and (max-width: 700px) {
    padding: 0 2%;
    margin: auto;
  }

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
    max-width: 600px;
    margin: auto;
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
      color: ${styleConstants.greyText};
      text-align: center;

      &:hover {
        color: ${styleConstants.darkThemePaleText};
      }
      &:focus {
        outline: none;
      }

      &.active {
        color: ${styleConstants.darkThemePaleText};
        border-bottom: 1px solid ${styleConstants.mainAccent};
      }
    }

    .login-box__form-group {
      margin-bottom: 60px;

      .login-form__input {
        border-radius: 2px;
        display: block;
        width: 100%;
        border: 1px solid ${styleConstants.lightText};
        padding: 15px;
        margin-bottom: 15px;
        line-height: 18px;
        font-size: 14px;

        &::placeholder {
          color: ${styleConstants.lightText};
          opacity: 1;
        }
      }

      .login-form__forgot-password {
        line-height: 21px;
        font-size: 14px;
        color: ${styleConstants.greyText};
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

  .error {
    height: auto;
    opacity: 1;
    transition: height 1s, opacity 1s;
    text-align: center;
    margin-bottom: 10px;
    color: crimson;
  }

  .error-appear {
    opacity: 0.01;
    height: 0px;
  }

  .error-appear.sidenav__link-text-appear-active {
    opacity: 1;
    height: auto;
    transition: opacity 0.5s ease-in;
  }

  .information-message {
    margin-bottom: 20px;
  }
`

class Login extends React.Component {
  state = {
    error: null,
    form: {
      username: '',
      password: '',
      confirmationCode: '',
    },
  }
  constructor(props) {
    super(props)
    this._validAuthStates = ['signIn', 'forgotPassword', 'signUp']
  }
  signIn() {
    Auth.signIn(this.state.form.email, this.state.form.password)
      .then(user => {
        this.handleStateActionChange(
          AppConstants.amplifyAuthActions.signedIn.awsState,
          user,
        )
        this.setState({ error: null })
      })
      .catch(error => {
        if (
          error.code ===
          AppConstants.amplifyErrorCodes.userNotConfirmedException
        ) {
          this.handleStateActionChange(
            AppConstants.amplifyAuthActions.confirmSignUp.awsState,
          )

          return
        }

        this.setState({ error: error.message })
      })
  }
  signUp() {
    Auth.signUp({
      username: this.state.form.email,
      password: this.state.form.password,
    })
      .then(data => {
        this.setState({ error: null })

        this.handleStateActionChange(
          AppConstants.amplifyAuthActions.confirmSignUp.awsState,
          data,
        )
      })
      .catch(error => this.setState({ error: error.message }))
  }
  confirmSignUp() {
    Auth.confirmSignUp(
      this.state.form.email,
      this.state.form.confirmationCode,
      {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true,
      },
    )
      .then(data => {
        this.handleStateActionChange(
          AppConstants.amplifyAuthActions.signIn.awsState,
          data,
        )
      })
      .catch(error => this.setState({ error: error.message }))
  }
  onForgotPassword() {
    Auth.forgotPassword(this.state.form.email)
      .then(data => {
        this.handleStateActionChange(
          AppConstants.amplifyAuthActions.verifyContact.awsState,
          data,
        )
        this.setState({ error: null })
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }
  onConfirmForgotPassword() {
    Auth.forgotPasswordSubmit(
      this.state.form.email,
      this.state.form.confirmationCode,
      this.state.form.password,
    )
      .then(data => {
        this.handleStateActionChange(
          AppConstants.amplifyAuthActions.signIn.awsState,
          data,
        )
        this.setState({ error: null })
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }
  handleSubmit() {
    switch (this.props.authState) {
      case AppConstants.amplifyAuthActions.signIn.awsState: {
        this.signIn()
        break
      }
      case AppConstants.amplifyAuthActions.signUp.awsState: {
        this.signUp()
        break
      }
      case AppConstants.amplifyAuthActions.confirmSignUp.awsState: {
        this.confirmSignUp()
        break
      }
      case AppConstants.amplifyAuthActions.forgotPassword.awsState: {
        this.onForgotPassword()
        break
      }
      case AppConstants.amplifyAuthActions.verifyContact.awsState: {
        this.onConfirmForgotPassword()
        break
      }
      default: {
        break
      }
    }
  }
  handleStateActionChange(action, data) {
    this.props.onStateChange(action, data)
    this.setState({ error: null })
  }
  handleInputChange(event) {
    event.persist()
    this.setState(oldState => ({
      form: {
        ...oldState.form,
        [event.target.name]: event.target.value.trim(),
      },
      error: null,
    }))
  }
  render() {
    const { error } = this.state
    const { authState } = this.props
    const isSignIn =
      authState === AppConstants.amplifyAuthActions.signIn.awsState
    const isSignUp =
      authState === AppConstants.amplifyAuthActions.signUp.awsState
    const isConfirmSignUp =
      authState === AppConstants.amplifyAuthActions.confirmSignUp.awsState
    const isForgotPassword =
      authState === AppConstants.amplifyAuthActions.forgotPassword.awsState
    const isForgotPasswordConfirm =
      authState === AppConstants.amplifyAuthActions.verifyContact.awsState

    if (
      !isSignIn &&
      !isSignUp &&
      !isConfirmSignUp &&
      !isForgotPassword &&
      !isForgotPasswordConfirm
    ) {
      return null
    }

    return (
      <StyledLogin className="login">
        {authState}
        <div className="login__container">
          <div className="login__login-box-wrapper">
            <div className="login__logo">
              <Logo width="370" />
            </div>
            <div className="login-box">
              <div className="login-box__nav-links-wrapper">
                <button
                  onClick={() =>
                    this.handleStateActionChange(
                      AppConstants.amplifyAuthActions.signIn.awsState,
                    )
                  }
                  className={
                    'login-box__nav-link ' + (isSignIn ? 'active' : '')
                  }
                >
                  Sign in
                </button>
                <button
                  onClick={() =>
                    this.handleStateActionChange(
                      AppConstants.amplifyAuthActions.signUp.awsState,
                    )
                  }
                  className={
                    'login-box__nav-link ' + (isSignUp ? 'active' : '')
                  }
                >
                  Sign up
                </button>
              </div>
              <form className="login-box__form-group login-form">
                {(isSignIn || isSignUp || isForgotPassword) && (
                  <input
                    name="email"
                    type="email"
                    className="login-form__input"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={event => this.handleInputChange(event)}
                  />
                )}
                {(isSignIn || isSignUp || isForgotPasswordConfirm) && (
                  <input
                    name="password"
                    type="password"
                    className="login-form__input"
                    placeholder={
                      isForgotPasswordConfirm ? 'New password' : 'Password'
                    }
                    autoComplete="off"
                    onChange={event => this.handleInputChange(event)}
                  />
                )}
                {(isConfirmSignUp || isForgotPasswordConfirm) && (
                  <Fragment>
                    <div className="information-message">
                      Please verify your email and enter the confirmation code
                    </div>
                    <input
                      name="confirmationCode"
                      type="text"
                      className="login-form__input"
                      placeholder="Confirmation code"
                      autoComplete="off"
                      onChange={event => this.handleInputChange(event)}
                    />
                  </Fragment>
                )}
                {isSignIn && (
                  <button
                    onClick={() =>
                      this.handleStateActionChange(
                        AppConstants.amplifyAuthActions.forgotPassword.awsState,
                      )
                    }
                    className="login-form__forgot-password"
                  >
                    Forgot your password?
                  </button>
                )}
              </form>

              <CSSTransition
                key="1"
                timeout={{ enter: 1000 }}
                classNames="sidenav__link-text"
              >
                <div className="error">{error}</div>
              </CSSTransition>
              <button
                className="login-box__submit"
                onClick={() => this.handleSubmit()}
              >
                {AppConstants.amplifyAuthActions[authState].title}
              </button>
            </div>
          </div>
        </div>
      </StyledLogin>
    )
  }
}

export default Login
