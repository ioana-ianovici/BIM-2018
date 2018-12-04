import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import { styleConstants } from '../../shared/constants/styleConstants'
import Requirements from '../../shared/Requirements'

const StyledManageUser = styled.div`
  padding: 50px;

  .section-wrapper {
    display: flex;
  }

  .section-left {
    background: transparent;
    width: 40%;
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
      color: ${styleConstants.mainAccent};
    }
  }

  .badge__image {
    display: block;
    width: 30px;
    height: 30px;
  }
`

class Badge extends PureComponent {
  constructor(props) {
    super(props)

    this.onAddBadge = this.onAddBadge.bind(this)
    this.onSubstractBadge = this.onSubstractBadge.bind(this)
  }

  onAddBadge() {
    this.props.onAddBadge(this.props.badge.id)
  }

  onSubstractBadge() {
    this.props.onSubstractBadge(this.props.badge.id)
  }

  render() {
    const { badge } = this.props

    return (
      <div className={'badge' + (badge.count > 0 ? ' badge--selected' : '')}>
        <div className="badge__manipulation">
          <div className="badge__substract" onClick={this.onSubstractBadge}>
            -
          </div>
          <div className="badge__count">{badge.count}</div>
          <div className="badge__add" onClick={this.onAddBadge}>
            +
          </div>
        </div>
        <div className="badge__image">
          test
          <img src={badge.badge} alt={badge.text} name={badge.text} />
        </div>
      </div>
    )
  }
}

Badge.propTypes = {
  badge: propTypes.shape({
    id: propTypes.number.isRequired,
    badge: propTypes.string.isRequired,
    count: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
  }).isRequired,
  onAddBadge: propTypes.func.isRequired,
  onSubstractBadge: propTypes.func.isRequired,
}

class ManageUser extends Component {
  state = {
    user: this.props.user,
  }

  constructor(props) {
    super(props)

    this.handleRequirementChange = this.handleRequirementChange.bind(this)
    this.handleBadgeAdd = this.handleBadgeAdd.bind(this)
    this.handleBadgeSubstract = this.handleBadgeSubstract.bind(this)
  }

  componentDidUpdate() {
    if (this.state.user !== this.props.user) {
      this.setState({ user: this.props.user })
    }
  }

  handleBadgeAdd(id) {
    const badges = this.state.user.badges.map(badge =>
      badge.id === id ? { ...badge, count: ++badge.count } : badge,
    )

    // todo: call api.
    this.setState(oldState => ({ user: { ...oldState.user, badges } }))
  }

  handleBadgeSubstract(id) {
    const badges = this.state.user.badges.map(badge =>
      badge.id === id ? { ...badge, count: --badge.count } : badge,
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

  render() {
    const { user } = this.state

    return (
      <StyledManageUser>
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
              {user.badges.map(badge => (
                <Badge
                  badge={badge}
                  key={badge.id}
                  alt={badge.text}
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
    requirements: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number,
        text: propTypes.string,
        isAccomplished: propTypes.boolean,
      }).isRequired,
    ).isRequired,
    badges: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        badge: propTypes.string.isRequired,
        count: propTypes.number.isRequired,
        text: propTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

export default ManageUser
