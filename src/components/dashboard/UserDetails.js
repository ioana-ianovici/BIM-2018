import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/constants/styleConstants'
import frame from './../../assets/frame.svg'

const StyledUserDetails = styled.div`
  .profile-info-section__profile-picture-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
  }

  .profile-picture-frame {
    position: absolute;
    top: 62px;
    left: -101px;
  }

  .profile-picture-frame-piece {
    position: absolute;
    bottom: -15px;
    left: 50px;
    height: 25px;
    width: 25px;
    background-image: url(${props => props.userFrame});
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
    color: ${styleConstants.darkThemeLightText};
  }

  .profile-info-section__user-title--padded {
    padding: 40px 0;
  }

  .profile-info-section__user-progress {
    background: ${styleConstants.mainAccent};
    background: -moz-linear-gradient(left, ${styleConstants.mainAccent} 0%, ${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage || 0}%, #2a2f39 ${props =>
  props.userTitleProgressPercentage || 0}%, #2a2f39 100%);
    background: -webkit-linear-gradient(left, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage || 0 || 0}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage || 0}%,#2a2f39 100%);
    background: linear-gradient(to right, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userTitleProgressPercentage || 0 || 0}%,#2a2f39 ${props =>
  props.userTitleProgressPercentage}%,#2a2f39 100%);
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
      userTitle,
      userFrame,
      userNextTitle,
      userLastTitle,
    } = this.props

    return (
      <StyledUserDetails {...this.props}>
        <section className="section--no-gutter">
          <div className="profile-info-section">
            <div className="profile-info-section__profile-picture-wrapper">
              <div className="profile-picture profile-picture--self profile-picture--large" />
              {userFrame && (
                <Fragment>
                  <img
                    className="profile-picture-frame"
                    src={frame}
                    alt="frame"
                  />
                  <div className="profile-picture-frame-piece" />
                </Fragment>
              )}
            </div>
            <div className="profile-info-section__user-name">{userName}</div>
            {userTitle && (
              <div className="profile-info-section__user-title">
                {userTitle}
              </div>
            )}
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
  userFrame: propTypes.string,
  userTitleProgressPercentage: propTypes.number,
  userLastTitle: propTypes.string,
  userNextTitle: propTypes.string,
}

export default Dashboard
