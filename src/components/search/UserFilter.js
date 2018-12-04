import React, { Component } from 'react'
import styled from 'styled-components'
import Select from 'react-select'

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
    margin: 0 100px;
    align-items: flex-end;
    justify-content: space-between;
  }

  .filter__select-wrapper {
    padding: 10px;
    position: relative;
    display: flex;

    &:last-child {
      margin-right: 0;
    }
  }

  .filter--center {
    text-align: center;
  }

  .search__filter,
  .filter {
    min-width: 24%;
    position: relative;
  }

  .filter__role-icon,
  .filter__search-icon {
    margin-right: 10px;
  }

  .filter__ladder-select,
  .filter__requirements-select,
  .filter__step-select {
    .react-select__control {
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

    &--open {
      position: absolute;
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      top: 0;
      left: 0;
      background: ${styleConstants.darkThemeSecondaryBackground};
      z-index: 1;
    }
  }

  .badge {
    cursor: pointer;
    padding: 10px;
    display: block;
    width: 50px;
    height: 50px;
    margin: 0;
    border: 1px solid ${styleConstants.darkThemePaleText};
  }
`

class Search extends Component {
  state = {
    allUsers: this.props.allUsers,
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

    this.handleUserSelect = this.handleUserSelect.bind(this)
    this.handleCardUserSelect = this.handleCardUserSelect.bind(this)
    this.handleLadderSelect = this.handleLadderSelect.bind(this)
    this.handleRequirementSelect = this.handleRequirementSelect.bind(this)
    this.handleBadgeSelect = this.handleBadgeSelect.bind(this)
    this.handleStepSelect = this.handleStepSelect.bind(this)
    this.handleViewBadgesToggle = this.handleViewBadgesToggle.bind(this)
  }

  componentWillReceiveProps(props) {
    if (
      props.selectedUser &&
      (!this.props.selectedUser ||
        props.selectedUser.id !== this.props.selectedUser.id)
    ) {
      const selectedUser = props.allUsers.find(
        user => user.id === props.selectedUser.id,
      )

      this.setState({
        selectedUser: { label: selectedUser.userName, value: selectedUser.id },
      })
    }
  }

  handleUserSelect(selectedUser) {
    this.setState({ selectedUser })
    const selectedDisplayUser = this.props.allUsers.find(
      user => user.id === selectedUser.value,
    )
    this.props.onUserSelect(selectedDisplayUser)
  }

  handleCardUserSelect(selectedDisplayUser) {
    this.setState({
      selectedDisplayUser,
      selectedUser: {
        label: selectedDisplayUser.userName,
        value: selectedDisplayUser.id,
      },
    })
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
      allUsers,
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
    const allFilteredUsers = allUsers.filter(
      user =>
        (!selectedLadder ||
          !selectedLadder.value ||
          user.ladder === selectedLadder.value) &&
        (!selectedStep ||
          !selectedStep.value ||
          user.step === selectedStep.value) &&
        (!selectedBadge ||
          !selectedBadge.id ||
          user.badge === selectedBadge.id) &&
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
              onChange={this.handleUserSelect}
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
                placeholder="Role"
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
          <div className="search__filter filter filter--center">
            <div className="search__text">Badges</div>
            <div className="filter__badges-wrapper">
              <div className="filter__badges">
                <img
                  className="badge"
                  src={selectedBadge ? selectedBadge.url : null}
                  alt={selectedBadge ? selectedBadge.text : 'Choose badge'}
                  name={selectedBadge ? selectedBadge.text : 'Choose badge'}
                  onClick={this.handleViewBadgesToggle}
                />
              </div>
              {isViewAllBadges && (
                <div className="filter__badges--open">
                  {isViewAllBadges &&
                    badges.map(badge => (
                      <img
                        className="badge"
                        key={badge.id}
                        src={badge.url}
                        alt={badge.text}
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
          />
        )}
      </StyledUserFilter>
    )
  }
}

export default Search
