import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { API } from 'aws-amplify'
import { Storage } from 'aws-amplify'

import AddNew from './../../shared/AddNew'
import { styleConstants } from '../../shared/constants/styleConstants'
import RemoveImage from '../../shared/images/Remove.image'
import { s3Upload } from './awsStorage'

const StyledFrames = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .add-frame {
    position: absolute;
    top: 28px;
    left: 200px;
  }

  .add-frame__upload,
  .frame__upload {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
  }

  .add-frame__label {
    display: inline-block;
  }

  .frames {
    display: flex;
    flex-wrap: wrap;

    .frame {
      position: relative;

      &:hover {
        .frame__delete {
          display: block;
        }
      }
    }

    .frame__delete {
      border-radius: 50%;
      display: none;
      cursor: pointer;
      position: absolute;
      right: -5px;
      top: -5px;
      background-color: ${styleConstants.darkThemeSecondaryBackground};
    }

    img {
      width: 65px;
      height: 65px;
      cursor: pointer;
      padding: 15px;
    }
  }
`

class Frame extends PureComponent {
  render() {
    const { frame, onUpdateFrame, onRemoveFrame } = this.props

    return (
      <div className="frame">
        <input
          id="edit-frame"
          type="file"
          accept="image/*"
          className="frame__upload"
          onChange={event => onUpdateFrame(event, frame)}
        />
        <label htmlFor="edit-frame">
          {/* todo: add alt. */}
          <img src={frame.image} alt="" />
          <RemoveImage
            className="frame__delete"
            onClick={e => {
              e.preventDefault()
              onRemoveFrame(frame.frameId)
            }}
          />
        </label>
      </div>
    )
  }
}

Frame.propTypes = {
  frame: propTypes.shape({
    frameId: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    picture: propTypes.string.isRequired,
  }).isRequired,
  onUpdateFrame: propTypes.func.isRequired,
  onRemoveFrame: propTypes.func.isRequired,
}

class Frames extends PureComponent {
  state = {
    frames: [],
  }

  constructor(props) {
    super(props)

    this.handleAddNewFrame = this.handleAddNewFrame.bind(this)
    this.handleUpdateFrame = this.handleUpdateFrame.bind(this)
    this.handleRemoveFrame = this.handleRemoveFrame.bind(this)
    this.getFrames = this.getFrames.bind(this)

    this.getFrames()
  }

  getFrames() {
    API.get('Frames', '')
      .then(frames => {
        Promise.all(
          frames.map(frame =>
            Storage.vault.get(frame.picture, { level: 'public' }).then(res => {
              frame.image = res
            }),
          ),
        ).then(() => {
          this.setState({ frames })
        })
      })
      .catch(err => {
        console.log('error loading frames', err)
      })
  }

  async handleAddNewFrame(event) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    const fileName = await s3Upload(file)

    const body = {
      picture: fileName,
    }

    API.post('Frames', '', { body })
      .then(res => {
        this.getFrames()
      })
      .catch(err => {
        console.log('error adding frame', err)
      })
  }

  handleUpdateFrame(event, oldFrame) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    console.log(oldFrame, file)
    // todo: call api to update oldFrame with file, reset state frames.
  }

  handleRemoveFrame(frame) {
    API.del('Frames', `/${frame}`)
      .then(res => {
        this.getFrames()
      })
      .catch(err => {
        console.log('could not remove frame', err)
      })
  }

  render() {
    const { frames } = this.state

    return (
      <StyledFrames>
        <div className="add-frame">
          <input
            id="upload-frame"
            type="file"
            className="add-frame__upload"
            onChange={this.handleAddNewFrame}
          />
          <label htmlFor="upload-frame">
            <AddNew text="Add new frame" className="add-frame__label" />
          </label>
        </div>

        <div className="frames">
          {frames.map(frame => (
            <Frame
              key={frame.frameId}
              frame={frame}
              onUpdateFrame={this.handleUpdateFrame}
              onRemoveFrame={this.handleRemoveFrame}
            />
          ))}
        </div>
      </StyledFrames>
    )
  }
}

export default Frames
