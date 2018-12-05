import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { API } from 'aws-amplify'

import Sidenav from './Sidenav'
import { styleConstants } from './constants/styleConstants'
import { AppConstants } from './constants/constants'
import { Logo } from './Logo'

const StyledPageLayout = styled.div`
  height: 100%;
  overflow-y: hidden;
  display: flex;

  .content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }

  .content-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .main::-webkit-scrollbar-track,
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${styleConstants.darkThemeSecondaryBackground};
    border-left: 1px solid ${styleConstants.darkThemePaleBorder};
    border-right: 1px solid ${styleConstants.darkThemePaleBorder};
  }

  .main::-webkit-scrollbar,
  ::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  .main::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb {
    background-color: ${styleConstants.darkThemePrimaryBackground};
    border: 1px solid ${styleConstants.darkThemePaleBorder};
  }

  .main {
    min-width: 480px;
    background-color: ${styleConstants.darkThemeSecondaryBackground};
    margin-left: 60px;
    padding: 20px;
    height: 100%;
    overflow: auto;
  }

  header {
    display: table;
    width: 100%;
    padding: 0 30px 0 90px;
    height: 60px;
    background-color: ${styleConstants.darkThemePrimaryBackground};
    color: ${styleConstants.greyText};
  }

  .header__header-left {
    padding: 15px 0;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
    height: 30px;
  }

  .header__header-right {
    display: table-cell;
    text-align: right;
    vertical-align: middle;
  }

  .header-right--middle {
    vertical-align: middle;
  }

  .header-right__text {
    line-height: 21px;
    font-size: 16px;
    margin-right: 10px;
    color: ${styleConstants.greyText};
  }

  .header-right__text--highlighted {
    color: ${styleConstants.mainAccent};
  }

  .profile-picture {
    border-radius: 50%;
    background-size: cover;
    width: 40px;
    height: 40px;
    display: inline-block;
    background-image: url(${props => props.userPicture});
    background-position: center center;
  }

  .profile-picture--small {
    border: 1px solid ${styleConstants.mainAccent};
  }

  .profile-picture--large {
    width: 125px;
    height: 125px;
  }

  .profile-picture--medium {
    width: 55px;
    height: 55px;
    border: 2px solid ${styleConstants.darkThemeContrastBorder};
  }

  .logo {
    vertical-align: middle;
    height: 30px;
  }

  section {
    position: relative;
    background-color: ${styleConstants.darkThemePrimaryBackground};
    margin-bottom: 20px;
  }

  .section--no-gutter {
    margin: 0;
  }

  .react-select__menu-list {
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${styleConstants.darkThemeSecondaryBackground};
      border-left: 1px solid ${styleConstants.darkThemePaleBorder};
      border-right: 1px solid ${styleConstants.darkThemePaleBorder};
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${styleConstants.darkThemePrimaryBackground};
      border: 1px solid ${styleConstants.darkThemePaleBorder};
    }
  }

  .react-select__control,
  .react-select__menu,
  .react-select__option {
    background-color: ${styleConstants.darkThemePrimaryBackground};
    color: ${styleConstants.darkThemeLightText};
    line-height: 18px;
    font-size: 14px;
  }

  .react-select__value-container,
  .react-select__placeholder {
    overflow: visible;
  }

  .react-select__value-container.react-select__value-container--has-value,
  .react-select__single-value {
    color: ${styleConstants.darkThemeLightText};
  }

  .react-select__menu {
    margin: 0;
  }

  .react-select__option:hover {
    color: ${styleConstants.mainAccent};
    opacity: 0.7;
  }

  .react-select__option.is-selected {
    color: red !important;
  }

  .react-select__option.react-select__option--is-focused {
    color: ${styleConstants.mainAccent};
  }

  .react-select__control {
    border: 1px solid ${styleConstants.darkThemePaleText};
    border-radius: 2px;
    padding: 11px 13px;

    &:hover {
      border-color: ${styleConstants.darkThemePaleText};
    }
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__control.react-select__control--is-focused {
    border-color: ${styleConstants.darkThemePaleText};
    box-shadow: none;
  }

  .react-select__multi-value {
    background: transparent;
    border: 1px solid ${styleConstants.darkThemePaleText};
    color: ${styleConstants.darkThemeContrastTextColor};
  }

  .react-select__multi-value__label {
    color: ${styleConstants.darkThemeContrastTextColor};
  }

  .react-select__multi-value__remove {
    color: ${styleConstants.darkThemeContrastTextColor};

    &:hover {
      background: transparent;
      color: ${styleConstants.mainAccent};
    }
  }

  button {
    line-height: 18px;
    font-size: 14px;
    text-transform: uppercase;
    color: ${styleConstants.darkThemeButtonTextColor};
    padding: 10px 40px;
    background-color: ${styleConstants.mainAccent};
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      text-shadow: 0px 0px 1px ${styleConstants.darkThemeButtonTextColor};
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;

      &:hover {
        text-shadow: none;
      }
    }
  }

  input {
    border: none;
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    background: transparent;
    line-height: 18px;
    font-size: 14px;
    color: ${styleConstants.darkThemeContrastTextColor};
    height: 18px;

    &::placeholder {
      color: ${styleConstants.darkThemePaleText};
    }

    &:focus {
      outline: none;
      color: ${styleConstants.mainAccent};
      border-bottom: 1px solid ${styleConstants.mainAccent};
    }
  }
`

class PageLayout extends PureComponent {
  state = {
    user: null,
  }

  constructor(props) {
    super(props)

    this.loadUserData()
  }

  // todo: extract this method to utility service.
  loadUserData() {
    API.get('Self', '', {})
      .then(response => {
        this.setState({
          user: {
            userName: response.userName,
            userPicture: response.picture,
          },
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { user } = this.state

    return (
      <StyledPageLayout {...user}>
        <div className="content-left">
          <Sidenav />
        </div>
        <div className="content-right">
          <header>
            <div className="header__header-left">
              <Logo className="logo" />
            </div>
            {user && (
              <div className="header__header-right header-right">
                <span className="header-right__text">
                  Hello,{' '}
                  <span className="header-right__text--highlighted">
                    {user.userName}
                  </span>
                  !
                </span>
                <img
                  className="profile-picture profile-picture--small header-right--middle"
                  src={user.userPicture}
                  alt="profile"
                />
              </div>
            )}
          </header>

          <div className="main" key="1">
            {this.props.children}
          </div>
        </div>
      </StyledPageLayout>
    )
  }
}

export default withRouter(PageLayout)
