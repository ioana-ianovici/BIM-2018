import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import propTypes from 'prop-types'

import { styleConstants } from '../../shared/constants/styleConstants'
import search from './../../assets/search.svg'
import filter from './../../assets/filter.svg'
import UserDetails from './UserDetails'

const StyledUserFilter = styled.div`
  .search {
    padding: 25px 70px 25px 85px;
  }

  .search__text {
    line-height: 18px;
    font-size: 14px;
    color: ${styleConstants.darkThemeLightText};
    margin-bottom: 10px;
  }

  .search__text--padded {
    padding-left: 40px;
  }

  .search__area {
    position: relative;
  }

  .search__icon {
    position: absolute;
    left: -50px;
    top: 44%;
  }

  .search__select {
    width: 100%;
    min-width: 200px;
    background: transparent;

    .react-select__control {
      background: transparent;
      border: none;
      border-bottom: 1px solid ${styleConstants.darkThemeLightText};
      padding: 0;
    }

    .react-select__indicators {
      display: none;
    }

    .react-select__value-container {
      margin: 0;
      padding: 0;
    }
  }

  .search__filters {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    margin: 0 100px;
    align-items: flex-end;
    justify-content: space-evenly;
  }

  .filter__select-wrapper {
    padding: 10px;
    position: relative;
    display: flex;

    &:last-child {
      margin-right: 0;
    }
  }

  .search__filter,
  .filter {
    position: relative;
    margin-right: 10px;
  }

  .filter__role-icon,
  .filter__search-icon {
    margin-right: 10px;
  }

  .filter__ladder-select,
  .filter__requirements-select,
  .filter__step-select {
    .react-select__control {
      min-width: 200px;
      padding: 0;
      display: flex;
      flex-wrap: nowrap;
      background: transparent;
    }

    .react-select__value-container {
      min-width: 100px;
    }
  }

  .filter__badges-wrapper {
    position: relative;
  }

  .filter__badges {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid ${styleConstants.darkThemePaleText};
    align-items: center;
    display: inline-flex;
    border-radius: 3px;

    &--open {
      position: absolute;
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      top: 0;
      left: 0;
      background: ${styleConstants.darkThemeSecondaryBackground};
      z-index: 1;
      flex-wrap: wrap;
      width: 200px;

      .badge {
        border: 1px solid ${styleConstants.darkThemePaleText};
      }
    }
  }

  .badge {
    cursor: pointer;
    padding: 10px;
    display: block;
    width: 50px;
    height: 50px;
    margin: 0;
  }
`

class UserFilter extends PureComponent {
  state = {
    users: this.props.users,
    ladders: this.props.ladders,
    badges: this.props.badges,
    steps: this.props.steps,
    requirements: this.props.requirements,
    selectedUser: null,
    selectedLadder: null,
    selectedRequirements: [],
    selectedBadge: null,
    selectedStep: null,
    isViewAllBadges: false,
  }

  constructor(props) {
    super(props)

    this.onUserSelect = this.onUserSelect.bind(this)
    this.handleCardUserSelect = this.handleCardUserSelect.bind(this)
    this.handleLadderSelect = this.handleLadderSelect.bind(this)
    this.handleRequirementSelect = this.handleRequirementSelect.bind(this)
    this.handleBadgeSelect = this.handleBadgeSelect.bind(this)
    this.handleStepSelect = this.handleStepSelect.bind(this)
    this.handleViewBadgesToggle = this.handleViewBadgesToggle.bind(this)
  }

  componentDidUpdate() {
    if (this.state.users !== this.props.users) {
      this.setState({ users: this.props.users })
    }
    if (this.state.ladders !== this.props.ladders) {
      this.setState({ ladders: this.props.ladders })
    }
    if (this.state.badges !== this.props.badges) {
      this.setState({ badges: this.props.badges })
    }
  }

  onUserSelect(selectedUser) {
    this.setState({ selectedUser })
    const selectedDisplayUser = this.props.users.find(
      user => user.id === selectedUser.value,
    )
    this.props.onUserSelect(JSON.parse(JSON.stringify(selectedDisplayUser)))
  }

  handleCardUserSelect(selectedDisplayUser) {
    this.setState({
      selectedDisplayUser,
      selectedUser: {
        label: selectedDisplayUser.userName,
        value: selectedDisplayUser.id,
      },
    })
    this.props.onUserSelect(JSON.parse(JSON.stringify(selectedDisplayUser)))
  }

  handleLadderSelect(selectedLadder) {
    this.setState({ selectedLadder })
  }

  handleRequirementSelect(selectedRequirements) {
    this.setState({ selectedRequirements })
  }

  handleBadgeSelect(selectedBadge) {
    this.setState({ selectedBadge })
    this.handleViewBadgesToggle()
  }

  handleStepSelect(selectedStep) {
    this.setState({ selectedStep })
  }

  handleViewBadgesToggle() {
    this.setState(oldState => ({ isViewAllBadges: !oldState.isViewAllBadges }))
  }

  render() {
    const {
      users,
      selectedUser,
      ladders,
      requirements,
      badges,
      steps,
      selectedBadge,
      selectedLadder,
      selectedRequirements,
      selectedStep,
      isViewAllBadges,
    } = this.state

    const allFilteredUsers = users.filter(
      user =>
        (!selectedLadder ||
          !selectedLadder.value ||
          user.ladder === selectedLadder.value) &&
        (!selectedStep ||
          !selectedStep.value ||
          user.step === selectedStep.value) &&
        (!selectedBadge ||
          !selectedBadge.badgeId ||
          user.badge === selectedBadge.badgeId) &&
        (!selectedRequirements ||
          !selectedRequirements.value ||
          !selectedRequirements.length ||
          selectedRequirements.every(requirement =>
            user.requirements.find(requirement.value),
          )),
    )
    const selectFilteredUsers = allFilteredUsers.map(user => ({
      label: user.userName,
      value: user.id,
    }))

    return (
      <StyledUserFilter>
        <section className="search">
          <div className="search__text">Find the user to manage</div>
          <div className="search__area">
            <img className="search__icon" src={search} alt="search" />
            <Select
              placeholder="Search"
              className="search__select"
              classNamePrefix="react-select"
              value={selectedUser}
              onChange={this.onUserSelect}
              options={selectFilteredUsers}
              isSearchable={true}
            />
          </div>
        </section>
        <div className="search__filters">
          <div className="search__filter filter">
            <div className="filter__select-wrapper">
              <img
                className="filter__role-icon"
                src={filter}
                alt="filter icon"
              />
              <Select
                placeholder="Role"
                className="filter__ladder-select"
                classNamePrefix="react-select"
                value={selectedLadder}
                onChange={this.handleLadderSelect}
                options={ladders}
                isSearchable={true}
              />
            </div>
          </div>
          <div className="search__filter filter">
            <div className="search__text search__text--padded">
              Requirements
            </div>
            <div className="filter__select-wrapper">
              <img
                className="filter__search-icon"
                src={search}
                alt="search icon"
              />
              <Select
                placeholder="Requirements"
                className="search__select"
                classNamePrefix="react-select"
                value={selectedRequirements}
                onChange={this.handleRequirementSelect}
                options={requirements}
                isSearchable={true}
                isMulti={true}
              />
            </div>
          </div>
          <div className="search__filter filter">
            <div className="search__text">Badges</div>
            <div className="filter__badges-wrapper">
              <div className="filter__badges">
                {selectedBadge && (
                  <img
                    className="badge"
                    src={selectedBadge.picture}
                    alt={selectedBadge.title}
                    name={selectedBadge.title}
                    onClick={this.handleViewBadgesToggle}
                  />
                )}
                {!selectedBadge && (
                  <div
                    className="badge"
                    onClick={this.handleViewBadgesToggle}
                  />
                )}
              </div>
              {isViewAllBadges && (
                <div className="filter__badges--open">
                  {isViewAllBadges &&
                    badges &&
                    badges.length &&
                    badges.map(badge => (
                      <img
                        className="badge"
                        key={badge.picture || badge.badgeId}
                        src={badge.picture}
                        alt={badge.title}
                        onClick={() => this.handleBadgeSelect(badge)}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="search__filter filter">
            <div className="filter__select-wrapper">
              <Select
                placeholder="Step"
                className="filter__step-select"
                classNamePrefix="react-select"
                value={selectedStep}
                onChange={this.handleStepSelect}
                options={steps}
                isSearchable={true}
              />
            </div>
          </div>
        </div>
        {!selectedUser && (
          <UserDetails
            users={allFilteredUsers}
            onUserSelect={this.handleCardUserSelect}
            isSelf={false}
          />
        )}
      </StyledUserFilter>
    )
  }
}

UserFilter.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      // todo: tbd.
    }),
  ),
  ladders: propTypes.arrayOf(
    propTypes.shape({
      // todo: tbd.
    }),
  ),
  badges: propTypes.arrayOf(
    propTypes.shape({
      // todo: tbd.
    }),
  ),
  steps: propTypes.arrayOf(
    propTypes.shape({
      // todo: tbd.
    }),
  ),
  requirements: propTypes.arrayOf(
    propTypes.shape({
      // todo: tbd.
    }),
  ),
  onUserSelect: propTypes.func,
}

// todo: add propTypes.

export default UserFilter
