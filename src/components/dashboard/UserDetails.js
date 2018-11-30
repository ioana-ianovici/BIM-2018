import React, { Component } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/constants/styleConstants'

const StyledUserDetails = styled.div`
  .profile-picture--large {
    width: 125px;
    height: 125px;
  }

  .profile-info-section {
    text-align: center;
    padding: 25px 10px;
  }

  .profile-info-section__user-name {
    font-weight: bold;
    line-height: 31px;
    font-size: 21px;
    color: ${styleConstants.mainAccent};
  }

  .profile-info-section__user-title {
    line-height: 18px;
    font-size: 14px;
    color: ${styleConstants.lightText};
  }

  .profile-info-section__user-title--padded {
    padding: 40px 0;
  }

  .profile-info-section__user-progress {
    background: ${styleConstants.mainAccent};
    background: -moz-linear-gradient(left, ${styleConstants.mainAccent} 0%, ${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%, #2a2f39 ${props =>
  props.userProgressPercentage}%, #2a2f39 100%);
    background: -webkit-linear-gradient(left, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%,#2a2f39 ${props =>
  props.userProgressPercentage}%,#2a2f39 100%);
    background: linear-gradient(to right, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%,#2a2f39 ${props =>
  props.userProgressPercentage}%,#2a2f39 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=${
      styleConstants.mainAccent
    }, endColorstr='#2a2f39',GradientType=1 );
    width: 20%;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 50px;
  }
`

class Dashboard extends Component {
  state = {}

  render() {
    const {
      userName,
      userPicture,
      userTitle,
      userTitleProgressPercentage,
      userNextTitle,
      userLastTitle,
    } = this.props

    return (
      <StyledUserDetails userProgressPercentage={userTitleProgressPercentage}>
        <section>
          <div className="profile-info-section">
            <img
              className="profile-picture profile-picture--large"
              src={userPicture}
              alt="profile"
            />
            <div className="profile-info-section__user-name">{userName}</div>
            <div className="profile-info-section__user-title">{userTitle}</div>
            <div className="profile-info-section__user-title profile-info-section__user-title--padded">
              {userLastTitle}{' '}
              <span className="profile-info-section__user-progress" />{' '}
              {userNextTitle}
            </div>
          </div>
        </section>
      </StyledUserDetails>
    )
  }
}

Dashboard.propTypes = {
  userName: propTypes.string,
  userPicture: propTypes.string,
  userTitle: propTypes.string,
  userTitleProgressPercentage: propTypes.number,
  userLastTitle: propTypes.string,
  userNextTitle: propTypes.string,
}

export default Dashboard
