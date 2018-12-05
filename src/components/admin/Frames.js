import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import AddNew from './../../shared/AddNew'
import { styleConstants } from '../../shared/constants/styleConstants'
import defaultFrame1 from '../../assets/frame-1.svg'
import defaultFrame2 from '../../assets/frame-2.svg'
import defaultFrame3 from '../../assets/frame-3.svg'

const StyledFrames = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .add-frame {
    position: absolute;
    top: 28px;
    left: 200px;
  }

  .add-frame__upload {
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
    const { frame, onUpdateFrame } = this.props

    return (
      <div>
        <input
          id="edit-frame"
          type="file"
          accept="image/*"
          className="add-frame__upload"
          onChange={event => onUpdateFrame(event, frame)}
        />
        <label htmlFor="edit-frame">
          {/* todo: add alt. */}
          <img src={frame} alt="" />
        </label>
      </div>
    )
  }
}

Frame.propTypes = {
  frame: propTypes.string.isRequired,
  onUpdateFrame: propTypes.func.isRequired,
}

class Frames extends PureComponent {
  state = {
    frames: [],
  }

  constructor(props) {
    super(props)
    const defaultFrames = [defaultFrame1, defaultFrame2, defaultFrame3]

    this.handleAddNewFrame = this.handleAddNewFrame.bind(this)
    this.handleUpdateFrame = this.handleUpdateFrame.bind(this)

    // todo: get from api.
    this.state = {
      frames:
        this.state.frames && this.state.frames.length
          ? this.state.frames
          : defaultFrames,
    }
  }

  handleAddNewFrame(event) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    // todo: call api to set new file as new frame, reset state frames.
  }

  handleUpdateFrame(event, oldFrame) {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    console.log(oldFrame, file)
    // todo: call api to update oldFrame with file, reset state frames.
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
              key={frame}
              frame={frame}
              onUpdateFrame={this.handleUpdateFrame}
            />
          ))}
        </div>
      </StyledFrames>
    )
  }
}

export default Frames
