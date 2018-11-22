import React, { Component } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/styleConstants'

const StyledUserDetails = styled.div`
  .profile-picture--large {
    width: 125px;
    height: 125px;
  }

  .main-profile-info-section {
    text-align: center;
    padding: 25px 10px;
  }

  .main-profile-info-section__user-name {
    font-weight: bold;
    line-height: 31px;
    font-size: 21px;
    color: ${styleConstants.mainAccent};
  }

  .main-profile-info-section__user-title {
    line-height: 18px;
    font-size: 14px;
    color: ${styleConstants.lightText};
  }

  .main-profile-info-section__user-title--padded {
    padding: 40px 0;
  }

  .main-profile-info-section__user-progress {
    background: ${styleConstants.mainAccent};
    background: -moz-linear-gradient(left, ${styleConstants.mainAccent} 0%, ${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%, #2a2f39 ${props =>
  props.userProgressPercentage}%, #2a2f39 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%,#2a2f39 ${props =>
  props.userProgressPercentage}%,#2a2f39 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, ${styleConstants.mainAccent} 0%,${
  styleConstants.mainAccent
} ${props => props.userProgressPercentage}%,#2a2f39 ${props =>
  props.userProgressPercentage}%,#2a2f39 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=${
      styleConstants.mainAccent
    }, endColorstr='#2a2f39',GradientType=1 ); /* IE6-9 */
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
    return (
      <StyledUserDetails userProgressPercentage={45}>
        <section>
          <div className="main-profile-info-section">
            <img
              className="profile-picture profile-picture--large"
              src="http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg"
              alt="profile"
            />
            <div className="main-profile-info-section__user-name">
              User name
            </div>
            <div className="main-profile-info-section__user-title">
              User title
            </div>
            <div className="main-profile-info-section__user-title main-profile-info-section__user-title--padded">
              Rookie{' '}
              <span className="main-profile-info-section__user-progress" />{' '}
              Master
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
  userTitleProgressPercentage: propTypes.string,
  userLastTitle: propTypes.string,
  userNextTitle: propTypes.string,
}

export default Dashboard
