import React, { PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import sidebarToogleIcon from './../assets/sidebar/sidebar-toggle.svg'
import sidebarHomeIcon from './../assets/sidebar/sidebar-home.svg'
import sidebarUserSettingsIcon from './../assets/sidebar/sidebar-user-settings.svg'
import sidebarVerticalIcon from './../assets/sidebar/sidebar-vertical.svg'
import sidebarSettings from './../assets/sidebar/sidebar-settings.svg'
import sidebarLogout from './../assets/sidebar/sidebar-logout.svg'
import { styleConstants } from './constants/styleConstants'
import { AppConstants } from './constants/constants'

const StyledSidenav = styled.div`
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

  .sidenav__link-text-enter {
    opacity: 0.01;
  }

  .sidenav__link-text-enter.sidenav__link-text-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
`

class Sidenav extends PureComponent {
  state = {
    isSidebarExpanded: false,
    isSidebarTextVisible: false,
  }
  constructor(props) {
    super(props)
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
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
      <StyledSidenav>
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
              to={AppConstants.routes.dashboard}
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarHomeIcon} alt="dashboard" />
              {isSidebarTextVisible ? (
                <CSSTransition
                  key="1"
                  timeout={{ enter: 500 }}
                  classNames="sidenav__link-text"
                >
                  <span key="1">Dashboard</span>
                </CSSTransition>
              ) : null}
            </NavLink>
            <NavLink
              to={AppConstants.routes.admin}
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarUserSettingsIcon} alt="admin" />
              {isSidebarTextVisible ? (
                <CSSTransition
                  key="1"
                  timeout={{ enter: 500 }}
                  classNames="sidenav__link-text"
                >
                  <span key="1">Admin</span>
                </CSSTransition>
              ) : null}
            </NavLink>
            <NavLink
              to={AppConstants.routes.search}
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarVerticalIcon} alt="search" />
              {isSidebarTextVisible ? (
                <CSSTransition
                  key="1"
                  timeout={{ enter: 500 }}
                  classNames="sidenav__link-text"
                >
                  <span key="1">Search</span>
                </CSSTransition>
              ) : null}
            </NavLink>
          </div>
          <div className="sidenav__sidenav-bottom">
            <NavLink
              to={AppConstants.routes.settings}
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarSettings} alt="settings" />
              {isSidebarTextVisible ? (
                <CSSTransition
                  key="1"
                  timeout={{ enter: 500 }}
                  classNames="sidenav__link-text"
                >
                  <span key="1">Settings</span>
                </CSSTransition>
              ) : null}
            </NavLink>
            <NavLink
              to={AppConstants.routes.logout}
              className="sidenav__link"
              activeClassName="selected"
            >
              <img src={sidebarLogout} alt="logout" />
              {isSidebarTextVisible ? (
                <CSSTransition
                  key="1"
                  timeout={{ enter: 500 }}
                  classNames="sidenav__link-text"
                >
                  <span key="1">Logout</span>
                </CSSTransition>
              ) : null}
            </NavLink>
          </div>
        </div>
      </StyledSidenav>
    )
  }
}

export default withRouter(Sidenav)
