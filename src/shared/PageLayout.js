import React from 'react'
import styled from 'styled-components'

import Sidenav from './Sidenav'
import { styleConstants } from './constants/styleConstants'
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

const PageLayout = props => {
  return (
    <StyledPageLayout>
      <div className="content-left">
        <Sidenav />
      </div>
      <div className="content-right">
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

        <div className="main" key="1">
          {props.children}
        </div>
      </div>
    </StyledPageLayout>
  )
}

export default PageLayout
