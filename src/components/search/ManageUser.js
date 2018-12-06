import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { API, Storage } from 'aws-amplify'

import { styleConstants } from '../../shared/constants/styleConstants'
import Requirements from '../../shared/Requirements'
import LevelUp from '../../shared/images/LevelUp.image'
import { AppConstants } from '../../shared/constants/constants'

const StyledManageUser = styled.div`
  padding: 50px;

  .user-details {
    margin: auto;
    max-width: 300px;
    margin-bottom: 50px;
  }

  .user-details__main-info {
    max-width: 300px;
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    margin-bottom: 5px;

    .main-info__aside {
      display: inline-block;
      text-align: left;
    }

    .profile-picture {
      width: 45px;
      height: 45px;
      display: inline-block;
      border: 1px solid ${styleConstants.mainAccent};
      margin-right: 10px;
      border-radius: 50%;
      background-image: url(${props => JSON.stringify(props.picture || '')});
      background-size: cover;
      background-position: center;
    }

    h2 {
      font-weight: 300;
      line-height: 31px;
      font-size: 21px;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      color: ${styleConstants.mainAccent};
    }

    p {
      margin: 0;
      padding: 0;
      line-height: 18px;
      font-size: 14px;
      color: ${styleConstants.darkThemePaleText};
    }
  }

  .user-details__actions {
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    color: ${styleConstants.darkThemePaleBorder};

    .levelup__icon {
      margin-right: 10px;
    }

    &:hover {
      color: ${styleConstants.mainAccent};

      .levelup__icon path {
        fill: ${styleConstants.mainAccent};
      }
    }
  }

  .section-wrapper {
    display: flex;
  }

  .section-left {
    background: transparent;
    width: 50%;
    height: 100%;
    padding: 0 50px 0 0;
    color: ${styleConstants.mainAccent};

    &:after {
      display: block-size;
      content: ' ';
      border-right: 1px solid ${styleConstants.darkThemePaleText};
      height: 50%;
      width: 1px;
      position: absolute;
      right: 0;
      top: 25%;
    }
  }

  .requirement {
    cursor: pointer;
  }

  .section-right {
    background: transparent;
    width: 50%;
    margin-right: 20px;
    padding: 0 0 0 50px;
    position: relative;
  }

  .section-right__title {
    margin-top: 0;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-weight: 300;
    line-height: 31px;
    font-size: 21px;
    text-transform: uppercase;
    color: ${styleConstants.mainAccent};
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
  }

  .badge {
    position: relative;
    border: 1px solid ${styleConstants.darkThemePaleText};
    padding: 20px 15px 10px 15px;
    text-align: center;
    margin: 0;
    color: ${styleConstants.darkThemeContrastTextColor};

    &:hover .badge__manipulation {
      display: flex;
    }
  }

  .badge--selected {
    background-color: ${styleConstants.mainAccent};
  }

  .badge__manipulation {
    display: none;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15px;
    justify-content: space-evenly;
  }

  .badge__substract,
  .badge__count,
  .badge__add {
    padding: 2px;
  }

  .badge__substract,
  .badge__add {
    cursor: pointer;

    &:hover {
      color: ${styleConstants.darkThemeContrastTextColor};
      text-shadow: 0px 0px 1px ${styleConstants.darkThemeContrastTextColor};
    }
  }

  .badge__image {
    display: block;

    img {
      width: 30px;
      height: 30px;
    }
  }
`

class Badge extends PureComponent {
  constructor(props) {
    super(props)

    this.onAddBadge = this.onAddBadge.bind(this)
    this.onSubstractBadge = this.onSubstractBadge.bind(this)
  }

  onAddBadge() {
    this.props.onAddBadge(this.props.badge.badgeId)
  }

  onSubstractBadge() {
    this.props.onSubstractBadge(this.props.badge.badgeId)
  }

  render() {
    const { badge } = this.props

    return (
      <div className={'badge' + (badge.count > 0 ? ' badge--selected' : '')}>
        <div className="badge__manipulation">
          <div className="badge__substract" onClick={this.onSubstractBadge}>
            -
          </div>
          <div className="badge__count">{badge.count || 0}</div>
          <div className="badge__add" onClick={this.onAddBadge}>
            +
          </div>
        </div>
        <div className="badge__image">
          <img src={badge.picture} alt={badge.title} name={badge.title} />
        </div>
      </div>
    )
  }
}

Badge.propTypes = {
  badge: propTypes.shape({
    badgeId: propTypes.string.isRequired,
    picture: propTypes.string.isRequired,
    count: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string,
  }).isRequired,
  onAddBadge: propTypes.func.isRequired,
  onSubstractBadge: propTypes.func.isRequired,
}

class ManageUser extends Component {
  state = {
    user: this.props.user,
    allBadges: [],
  }

  constructor(props) {
    super(props)

    this.handleRequirementChange = this.handleRequirementChange.bind(this)
    this.handleBadgeAdd = this.handleBadgeAdd.bind(this)
    this.handleBadgeSubstract = this.handleBadgeSubstract.bind(this)
    this.getAllBadges = this.getAllBadges.bind(this)
    this.getUserDetails = this.getUserDetails.bind(this)

    this.getAllBadges().then(() => {
      this.getUserDetails()
    })
  }

  getUserDetails() {
    API.get(
      'Badges',
      `/${this.state.allBadges.map(badge => badge.badgeId).toString()}`,
    )
      .then(badges => {
        badges.forEach(badge => {
          badge.count = this.state.user.badges.filter(
            b => b === badge.badgeId,
          ).length
        })

        Promise.all(
          badges
            .filter(b => b.picture)
            .map(badge =>
              Storage.vault
                .get(badge.picture, { level: 'public' })
                .then(res => (badge.picture = res)),
            ),
        ).then(() => {
          this.setState({ allBadges: badges, allBadgesLoaded: true })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAllBadges() {
    return API.get(AppConstants.endpoints.badges, '')
      .then(allBadges => {
        this.setState({ allBadges })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    if (this.state.user.id !== this.props.user.id) {
      this.setState({ user: this.props.user })
    }
  }

  handleBadgeAdd(id) {
    const badges = this.state.user.badges.map(badge =>
      badge.badgeId === id ? { ...badge, count: ++badge.count } : badge,
    )

    // todo: call api.
    this.setState(oldState => ({ user: { ...oldState.user, badges } }))
  }

  handleBadgeSubstract(id) {
    const badges = this.state.user.badges.map(badge =>
      badge.badgeId === id ? { ...badge, count: --badge.count } : badge,
    )

    // todo: call api.
    this.setState(oldState => ({ user: { ...oldState.user, badges } }))
  }

  handleRequirementChange(id) {
    const requirements = this.state.user.requirements.map(requirement =>
      requirement.id === id
        ? { ...requirement, isAccomplished: !requirement.isAccomplished }
        : requirement,
    )

    // todo: call api.
    this.setState(oldState => ({ user: { ...oldState.user, requirements } }))
  }

  handleLevelUp() {
    console.log('level up')
    // todo: call api.
  }

  render() {
    const { user, allBadges, allBadgesLoaded } = this.state

    return (
      <StyledManageUser {...user}>
        <div className="user-details">
          <div className="user-details__main-info main-info">
            <div className="profile-picture profile-picture--small" />
            <div className="main-info__aside">
              <h2>{user.userName}</h2>
              <p>{user.step}</p>
            </div>
          </div>
          <div className="user-details__actions" onClick={this.handleLevelUp}>
            <LevelUp className="levelup__icon" />
            Level up
          </div>
        </div>
        <div className="section-wrapper">
          <section className="section-left">
            <Requirements
              requirements={user.requirements}
              onSelect={this.handleRequirementChange}
            />
          </section>
          <section className="section-right">
            <h2 className="section-right__title">Badges</h2>
            <div className="badges">
              {allBadgesLoaded &&
                allBadges.map(badge => (
                  <Badge
                    badge={badge}
                    key={badge.picture || badge.badgeId}
                    onAddBadge={this.handleBadgeAdd}
                    onSubstractBadge={this.handleBadgeSubstract}
                  />
                ))}
            </div>
          </section>
        </div>
      </StyledManageUser>
    )
  }
}

ManageUser.propTypes = {
  user: propTypes.shape({
    picture: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
    step: propTypes.string.isRequired,
    requirements: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number,
        text: propTypes.string,
        isAccomplished: propTypes.boolean,
      }).isRequired,
    ).isRequired,
    badges: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
}

export default ManageUser
