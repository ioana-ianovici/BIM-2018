import React, { PureComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import propTypes from 'prop-types'

import AddNew from './../../shared/AddNew'
import { styleConstants } from '../../shared/constants/styleConstants'

const StyledBadges = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .badges {
    display: flex;

    @media screen and (max-width: 800px) {
      flex-wrap: wrap;

      .badges__add-edit-wrapper {
        width: 100%;
        margin-right: 0;
        margin-bottom: 40px;
      }

      .badges__list {
        width: 100%;
      }
    }
  }

  .badges__add-edit-wrapper {
    width: 30%;
    margin-right: 100px;
  }

  .add-badge {
    position: absolute;
    top: 28px;
    left: 200px;
  }

  .add-badge__icon {
    margin-right: 5px;
  }

  .add-badge__text {
    line-height: 18px;
    font-size: 14px;
    color: ${styleConstants.DarkThemeLightText};
  }

  .badges__list {
    width: 70%;
    border: 1px solid ${styleConstants.darkThemePaleText};
    border-radius: 3px;
    padding: 30px 10px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    img {
      padding: 20px;
    }
  }

  .badges__select-default-set {
    width: 100%;
    margin-bottom: 20px;
  }

  .add-edit-badge {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
  }

  .badge__image {
    border: 1px solid ${styleConstants.darkThemePaleText};
    border-radius: 3px;
    padding: 10px;
    display: inline-block;
    margin-right: 15px;
    position: relative;

    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }

  .badge__upload {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
  }

  .badge__upload-label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .badge__name {
    display: inline-block;
  }
`

class Badge extends PureComponent {
  render() {
    const { badge, onBadgeSelect } = this.props

    return (
      <img
        src={badge.image}
        alt={badge.name}
        name={badge.name}
        onClick={() => onBadgeSelect(badge)}
      />
    )
  }
}

Badge.propTypes = {
  badge: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    image: propTypes.string,
  }),
  onBadgeSelect: propTypes.func,
}

class Badges extends PureComponent {
  state = {
    defaultSets: [
      { value: 'Default Set 1', label: 'Default Set 1' },
      { value: 'Default Set 2', label: 'Default Set 2' },
    ],
    selectedBadge: null,
    badgeName: null,
    badgeImage: null,
  }

  constructor(props) {
    super(props)
    this.handleBadgeNameChange = this.handleBadgeNameChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleAddEditBadgeSubmit = this.handleAddEditBadgeSubmit.bind(this)
    this.handleBadgeSelect = this.handleBadgeSelect.bind(this)
    this.handleAddNewBadge = this.handleAddNewBadge.bind(this)
  }

  handleBadgeSetChange(set) {
    console.log('handle badge set change', set)
    // todo: api call.
  }

  handleBadgeNameChange(event) {
    this.setState({ badgeName: event.target.value })
  }

  handleFileChange(event) {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    this.generatePreviewImgUrl(file, badgeImage => {
      this.setState({ badgeImage })

      if (!this.state.badgeName) {
        const friendlyName = file.name.slice(0, file.name.lastIndexOf('.'))
        this.setState({ badgeName: friendlyName })
      }
    })
  }

  generatePreviewImgUrl(file, callback) {
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    reader.onloadend = e => callback(reader.result)
  }

  handleAddEditBadgeSubmit(e) {
    e.preventDefault()
    const { badgeImage, badgeName } = this.state
    console.log(badgeImage, badgeName)
    // todo: call api.
  }

  handleBadgeSelect(selectedBadge) {
    this.setState({
      selectedBadge,
      isAddBadge: false,
      badgeName: selectedBadge.name,
      badgeImage: selectedBadge.image,
    })
  }

  handleAddNewBadge() {
    this.setState({ isAddBadge: true, badgeImage: null, badgeName: null })
  }

  render() {
    const { selectedDefaultSet, badges } = this.props
    const {
      defaultSets,
      badgeImage,
      badgeName,
      isAddBadge,
      selectedBadge,
    } = this.state

    return (
      <StyledBadges>
        {!isAddBadge && (
          <AddNew
            className="badges__add-badge add-badge"
            onClick={this.handleAddNewBadge}
          />
        )}
        <div className="badges">
          {(selectedBadge || isAddBadge) && (
            <div className="badges__add-edit-wrapper">
              {!badges.length && (
                <Select
                  placeholder="Select a default set"
                  className="badges__select-default-set"
                  classNamePrefix="react-select"
                  value={defaultSets.find(
                    set => set.value === selectedDefaultSet,
                  )}
                  onChange={this.handleBadgeSetChange}
                  options={defaultSets}
                  isSearchable={false}
                />
              )}

              <form onSubmit={this.handleAddEditBadgeSubmit}>
                <div className="badge__add-edit-badge add-edit-badge">
                  <div className="badge__image">
                    <img src={badgeImage} alt="" />
                    <input
                      id="upload-badge"
                      type="file"
                      className="badge__upload"
                      onChange={this.handleFileChange}
                    />
                    <label
                      className="badge__upload-label"
                      htmlFor="upload-badge"
                      title="Upload Badge"
                    />
                  </div>
                  <input
                    className="badge__name"
                    type="text"
                    onChange={this.handleBadgeNameChange}
                    accept="image/*"
                    multiple={false}
                    placeholder="Badge name"
                    value={badgeName || ''}
                  />
                </div>
                <button disabled={!badgeName || !badgeImage}>Save</button>
              </form>
            </div>
          )}
          <div className="badges__list">
            {badges.map(badge => (
              <Badge
                key={badge.id}
                badge={badge}
                onBadgeSelect={this.handleBadgeSelect}
              />
            ))}
          </div>
        </div>
      </StyledBadges>
    )
  }
}

Badges.propTypes = {
  selectedDefaultSet: propTypes.string,
  badges: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      image: propTypes.string,
    }),
  ),
}

export default Badges
