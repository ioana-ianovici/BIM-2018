import React from 'react'
import loginImage from './../../assets/login-illustration.svg'
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
import { Auth } from 'aws-amplify'
import { styleConstants } from '../../shared/styleConstants'
import { Logo } from '../../shared/Logo'
import { AppConstants } from './../../shared/constants'

const StyledLogin = styled.div`
  height: 100%;
  padding: 7% 7%;
  margin: auto;
  /* background: ${styleConstants.mainColor} url(${loginImage}) no-repeat left
    center; */
  background: ${styleConstants.mainColor};
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
      color: rgba(80, 93, 104, 0.5);
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
        color: ${styleConstants.lightText};
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

  .error {
    height: auto;
    opacity: 1;
    transition: height 1s, opacity 1s;
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

`

class Login extends React.Component {
  state = {
    action: AppConstants.amplifyAuthActions.signIn.awsState,
    error: null,
    form: {
      username: '',
      password: '',
    },
  }
  login() {
    Auth.signIn(this.state.form.email, this.state.form.password)
      .then(user => {
        console.log(user)
        this.props.onStateChange('authenticated', user)
        this.setState({ error: null })
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }
  handleSubmit() {
    switch (this.state.action) {
      case AppConstants.amplifyAuthActions.signIn.awsState: {
        this.login()
        break
      }
      case AppConstants.amplifyAuthActions.signUp.awsState: {
        break
      }
      case AppConstants.amplifyAuthActions.forgotPassword.awsState: {
        break
      }
      default: {
        break
      }
    }
  }
  handleStateActionChange(action) {
    this.setState({ action: action, error: null })
  }
  handleInputChange(event) {
    event.persist()
    this.setState(oldState => ({
      form: { ...oldState.form, [event.target.name]: event.target.value },
      error: null,
    }))
  }
  render() {
    const { action, error } = this.state
    const isSignIn = action === AppConstants.amplifyAuthActions.signIn.awsState
    const isSignUp = action === AppConstants.amplifyAuthActions.signUp.awsState
    const isForgotPassword =
      action === AppConstants.amplifyAuthActions.forgotPassword.awsState

    return (
      <StyledLogin className="login">
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
                      AppConstants.amplifyAuthActions.signIn,
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
                      AppConstants.amplifyAuthActions.signUp,
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
                <input
                  name="email"
                  type="email"
                  className="login-form__input"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={event => this.handleInputChange(event)}
                />
                {!isForgotPassword && (
                  <input
                    name="password"
                    type="password"
                    className="login-form__input"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={event => this.handleInputChange(event)}
                  />
                )}
                {isSignIn && (
                  <button
                    onClick={() =>
                      this.handleStateActionChange(
                        AppConstants.amplifyAuthActions.forgotPassword,
                      )
                    }
                    className="login-form__forgot-password"
                  >
                    Forgot your password?
                  </button>
                )}
              </form>

              <CSSTransitionGroup
                transitionName="error"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div key={1} className="error">
                  {error}
                </div>
              </CSSTransitionGroup>
              <button
                className="login-box__submit"
                onClick={() => this.handleSubmit()}
              >
                {AppConstants.amplifyAuthActions[this.state.action].title}
              </button>
            </div>
          </div>
        </div>
      </StyledLogin>
    )
  }
}

export default Login
