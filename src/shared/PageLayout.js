import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'
import sidebarToogleIcon from './../assets/sidebar/sidebar-toggle.svg'
import sidebarHomeIcon from './../assets/sidebar/sidebar-home.svg'
import sidebarUserSettingsIcon from './../assets/sidebar/sidebar-user-settings.svg'
import sidebarVerticalIcon from './../assets/sidebar/sidebar-vertical.svg'
import sidebarHorizontalIcon from './../assets/sidebar/sidebar-horizontal.svg'
import sidebarSettings from './../assets/sidebar/sidebar-settings.svg'
import sidebarLogout from './../assets/sidebar/sidebar-logout.svg'
import { styleConstants } from './styleConstants'
import { Logo } from './Logo'

const StyledPageLayout = styled.div`
  height: 100%;

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

  .sidenav {
    height: 100%;
    width: 60px;
    position: fixed;
    display: table;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    background-color: ${styleConstants.darkThemePrimaryBackground}; //todo: get theme in app state.
    transition: width
      ${styleConstants.sidebarAnimationDurationMilliseconds + 'ms'};
  }

  .sidenav--expanded {
    transition: width 1s;
    width: 300px;

    .sidenav__link img {
      margin-right: 10px;
    }
  }

  .sidenav__sidenav-top {
    height: 70%;
    vertical-align: top;
    overflow: auto;
    display: table-row;
  }

  .sidenav__sidenav-bottom {
    height: 30%;
    vertical-align: bottom;
    overflow: auto;
    display: table-cell;
  }

  .sidenav__link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 20px;
    background: transparent;
    border: 0.5px solid ${styleConstants.darkThemePaleBorder}; //todo: get theme in app state.
    border-left: 0;
    border-right: 0;
    color: #fff;
    visibility: visible;
    opacity: 1;
    transition: opacity 2s linear;

    &.selected {
      color: ${styleConstants.mainAccent};
      border: 1px solid ${styleConstants.mainAccent};
      border-left: 0;
      border-right: 0;
    }

    &:focus {
      outline: none;
    }
  }

  .sidenav__link img {
    vertical-align: bottom;
    width: 20px;
  }

  .sidenav__link-text-appear {
    opacity: 0.01;
  }

  .sidenav__link-text-appear.sidenav__link-text-appear-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }

  .main {
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
  }

  .profile-picture--small {
    border: 1px solid ${styleConstants.mainAccent};
  }

  .logo {
    vertical-align: middle;
    height: 30px;
  }

  section {
    background-color: ${styleConstants.darkThemePrimaryBackground};
  }
`

class PageLayout extends PureComponent {
  state = {
    isSidebarExpanded: false,
    isSidebarTextVisible: false,
  }
  constructor(props) {
    super(props)
    this.handleSideButtonClick = this.handleSideButtonClick.bind(this)
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
  }
  handleSideButtonClick(event) {
    console.log(event)
  }
  handleSidebarToggle() {
    const isExpanded = this.state.isSidebarExpanded
    this.setState(
      { isSidebarExpanded: !isExpanded, isSidebarTextVisible: false },
      () => {
        setTimeout(() => {
          this.setState({ isSidebarTextVisible: this.state.isSidebarExpanded })
        }, styleConstants.sidebarAnimationDurationMilliseconds)
      },
    )
  }
  render() {
    const { isSidebarExpanded, isSidebarTextVisible } = this.state
    return (
      <StyledPageLayout userProgressPercentage={45}>
        <div
          className={
            'sidenav' + (isSidebarExpanded ? ' sidenav--expanded' : '')
          }
        >
          <button className="sidenav__link" onClick={this.handleSidebarToggle}>
            <img src={sidebarToogleIcon} alt="sidebar toggle" />
          </button>
          <div className="sidenav__sidenav-top">
            <NavLink
              to="/"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarHomeIcon} alt="home" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">Home</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
            <NavLink
              to="/page2"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarUserSettingsIcon} alt="user settings" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">User settings</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
            <NavLink
              to="/page2"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarVerticalIcon} alt="page2" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">page2</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
            <NavLink
              to="/page2"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarHorizontalIcon} alt="page2" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">page2</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
          </div>
          <div className="sidenav__sidenav-bottom">
            <NavLink
              to="/settings"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarSettings} alt="settings" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">Settings</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
            <NavLink
              to="/logout"
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarLogout} alt="logout" />
              {isSidebarTextVisible ? (
                <CSSTransitionGroup
                  transitionName="sidenav__link-text"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <span key="1">Logout</span>
                </CSSTransitionGroup>
              ) : null}
            </NavLink>
          </div>
        </div>

        <header>
          <div className="header__header-left">
            <Logo className="logo" />
          </div>
          <div className="header__header-right header-right">
            <span className="header-right__text">
              Hello,{' '}
              <span className="header-right__text--highlighted">User name</span>
              !
            </span>
            <img
              className="profile-picture profile-picture--small header-right--middle"
              src="http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg"
              alt="profile"
            />
          </div>
        </header>

        <div className="main">{this.props.children}</div>
      </StyledPageLayout>
    )
  }
}

export default PageLayout
