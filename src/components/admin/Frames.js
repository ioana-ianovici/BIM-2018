import React, { Component } from 'react'
import styled from 'styled-components'

import AddNew from './../../shared/AddNew'
import { styleConstants } from '../../shared/constants/styleConstants'

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
      width: 50px;
      height: 50px;
      cursor: pointer;
      padding: 15px;
    }
  }
`

class Frames extends Component {
  state = {
    //todo: get from api.
    frames: ['frame1', 'frame2', 'frame3'],
  }

  constructor(props) {
    super(props)

    this.handleAddNewFrame = this.handleAddNewFrame.bind(this)
    this.handleUpdateFrame = this.handleUpdateFrame.bind(this)
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
            <div key={frame}>
              <input
                id="edit-frame"
                type="file"
                accept="image/*"
                className="add-frame__upload"
                onChange={event => this.handleUpdateFrame(event, frame)}
              />
              <label htmlFor="edit-frame">
                {/* todo: add alt. */}
                <img src={frame} alt="" />
              </label>
            </div>
          ))}
        </div>
      </StyledFrames>
    )
  }
}

export default Frames
