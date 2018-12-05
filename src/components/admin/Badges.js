import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import AddNew from './../../shared/AddNew'
import { styleConstants } from '../../shared/constants/styleConstants'
import { API } from 'aws-amplify'
// import { Storage } from 'aws-amplify'
import { s3Upload } from './awsStorage'

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
    color: ${styleConstants.darkThemeLightText};
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

  .add-edit-badge {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
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

  .badge__description-wrapper {
    .badge__name,
    .badge__description {
      display: block;
      margin-bottom: 20px;
    }
  }
`

class Badge extends PureComponent {
  render() {
    const { badge, onBadgeSelect } = this.props

    return (
      <img
        src={badge.picture}
        alt={badge.title}
        name={badge.title}
        onClick={() => onBadgeSelect(badge)}
      />
    )
  }
}

Badge.propTypes = {
  badge: propTypes.shape({
    badgeId: propTypes.string,
    title: propTypes.string,
    picture: propTypes.string,
    description: propTypes.string,
  }),
  onBadgeSelect: propTypes.func,
}

class Badges extends PureComponent {
  state = {
    selectedBadge: null,
    badgeId: null,
    badgeName: null,
    badgeImage: null,
    badgeDescription: null,
  }

  constructor(props) {
    super(props)
    this.handleBadgeNameChange = this.handleBadgeNameChange.bind(this)
    this.handleBadgeDescriptionChange = this.handleBadgeDescriptionChange.bind(
      this,
    )
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleAddEditBadgeSubmit = this.handleAddEditBadgeSubmit.bind(this)
    this.handleBadgeSelect = this.handleBadgeSelect.bind(this)
    this.handleAddNewBadge = this.handleAddNewBadge.bind(this)
  }

  handleBadgeNameChange(event) {
    this.setState({ badgeName: event.target.value })
  }

  handleBadgeDescriptionChange(event) {
    this.setState({ badgeDescription: event.target.value })
  }

  handleFileChange(event) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    this.generatePreviewImgUrl(file, badgeImage => {
      this.setState({ badgeImage })

      if (!this.state.badgeName) {
        const friendlyName = file.name.slice(0, file.name.lastIndexOf('.'))
        this.setState({ badgeName: friendlyName, file: file })
      }
    })
  }

  // todo: extract to utility service.
  generatePreviewImgUrl(file, callback) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => callback(reader.result)
  }

  handleAddEditBadgeSubmit(e) {
    e.preventDefault()
    const {
      badgeId,
      badgeImage,
      badgeName,
      badgeDescription,
      file,
    } = this.state
    // console.log(badgeId, badgeImage, badgeName, badgeDescription)

    let fileUrl = ''
    s3Upload(file)
      .then(res => {
        console.log('file uploaded', res)
      })
      .catch(err => {
        console.log('could not update file', err)
      })

    // todo: call api.
    // if (badgeId) {
    //   // if there is a badgeId we update the existing badge
    //   console.log('is going to update the current badge')
    //   API.put('Badges', `/${badgeId}`, {
    //     body: {
    //       picture: file,
    //       title: badgeName,
    //       description: badgeDescription,
    //     },
    //   })
    //     .then(res => {
    //       console.log('badge updated', res)
    //     })
    //     .catch(err => {
    //       console.log('could not update badge', err)
    //     })
    // } else {
    //   // if there is no badgeId we create a new badge
    //   console.log('is going to create a new badge')
    //
    //   API.post('Badges', '', {
    //     body: {
    //       picture: badgeImage,
    //       title: badgeName,
    //       description: badgeDescription,
    //     },
    //   })
    //     .then(res => {
    //       console.log('badge added')
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log('could not add badge')
    //       console.log(err)
    //     })
    // }
  }

  handleBadgeSelect(selectedBadge) {
    this.setState({
      selectedBadge,
      isAddBadge: false,
      badgeId: selectedBadge.badgeId,
      badgeName: selectedBadge.title,
      badgeImage: selectedBadge.picture,
      badgeDescription: selectedBadge.description,
    })
  }

  handleAddNewBadge() {
    this.setState({
      isAddBadge: true,
      badgeId: null,
      badgeImage: null,
      badgeName: null,
      badgeDescription: null,
    })
  }

  render() {
    const { badges } = this.props
    const {
      badgeImage,
      badgeDescription,
      badgeName,
      isAddBadge,
      selectedBadge,
    } = this.state

    return (
      <StyledBadges>
        {!isAddBadge && (
          <AddNew
            text="Add new badge"
            className="badges__add-badge add-badge"
            onClick={this.handleAddNewBadge}
          />
        )}
        <div className="badges">
          {(selectedBadge || isAddBadge) && (
            <div className="badges__add-edit-wrapper">
              <form onSubmit={this.handleAddEditBadgeSubmit}>
                <div className="badge__add-edit-badge add-edit-badge">
                  <div className="badge__image">
                    {/* todo: add alt */}
                    <img src={badgeImage} alt="" />
                    <input
                      id="upload-badge"
                      type="file"
                      accept="image/*"
                      multiple={false}
                      className="badge__upload"
                      onChange={this.handleFileChange}
                    />
                    <label
                      className="badge__upload-label"
                      htmlFor="upload-badge"
                      title="Upload Badge"
                    />
                  </div>
                  <div className="badge__description-wrapper">
                    <input
                      className="badge__name"
                      type="text"
                      onChange={this.handleBadgeNameChange}
                      placeholder="Badge name"
                      value={badgeName || ''}
                    />
                    <input
                      className="badge__description"
                      type="text"
                      onChange={this.handleBadgeDescriptionChange}
                      placeholder="Description"
                      value={badgeDescription || ''}
                    />
                  </div>
                </div>
                <button disabled={!badgeName || !badgeImage}>Save</button>
              </form>
            </div>
          )}
          <div className="badges__list">
            {badges.map((badge, index) => (
              <Badge
                key={index}
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
  badges: propTypes.arrayOf(
    propTypes.shape({
      badgeId: propTypes.string,
      title: propTypes.string,
      picture: propTypes.string,
      description: propTypes.string,
    }),
  ),
}

export default Badges
