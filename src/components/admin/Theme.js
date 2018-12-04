import React, { Component } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'

import { AppConstants } from '../../shared/constants/constants'
import { styleConstants } from '../../shared/constants/styleConstants'
import MoonImage from '../../shared/images/Moon.image'
import SunImage from '../../shared/images/Sun.image'
import radioSelect from '../../assets/radio-select.svg'

const StyledTheme = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .theme-types {
    padding: 0 0 20px 0;
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    display: inline-block;
    margin-bottom: 20px;
  }

  .theme-type {
    cursor: pointer;
    margin-right: 20px;
    border: 1px solid ${styleConstants.darkThemePaleText};
    border-radius: 3px;
    color: ${styleConstants.darkThemePaleText};
    padding: 20px 40px;
    display: inline-block;
    text-align: center;

    &:hover {
      color: ${styleConstants.darkThemeLightText};

      svg path {
        fill: ${styleConstants.darkThemeLightText};
      }
    }

    div {
      margin-top: 5px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .theme-type--selected {
    border-color: ${styleConstants.mainAccent};
    color: ${styleConstants.darkThemeLightText};
  }

  .accent-colour {
    img {
      display: inline-block;
      vertical-align: bottom;
      margin-right: 5px;
    }
  }

  .sketch-picker {
    margin-top: 10px;
  }
`

class Theme extends Component {
  state = {
    // todo: read from api.
    theme: AppConstants.theme.dark,
    accentColour: styleConstants.mainAccent || 'red',
    displayColorPicker: false,
  }

  constructor(props) {
    super(props)

    this.updateThemeType = this.updateThemeType.bind(this)
    this.handleDisplayColorPickerClick = this.handleDisplayColorPickerClick.bind(
      this,
    )
    this.handleCloseColorPicker = this.handleCloseColorPicker.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  updateThemeType(theme) {
    // todo: call api, refresh, remove next line as refresh will make it useless.
    this.setState({ theme })
  }

  handleDisplayColorPickerClick() {
    this.setState(oldState => ({
      displayColorPicker: !oldState.displayColorPicker,
    }))
  }
  handleCloseColorPicker() {
    this.setState({ displayColorPicker: false })
  }

  handleColorChange(color) {
    // todo: call api, refresh.
  }

  render() {
    const { theme, accentColour } = this.state
    const isDarkTheme = theme === AppConstants.theme.dark
    const isLightTheme = theme === AppConstants.theme.light

    return (
      <StyledTheme>
        <div className="theme-types">
          <div
            className={
              'theme-type' + (isDarkTheme ? ' theme-type--selected' : '')
            }
            onClick={() => this.updateThemeType(AppConstants.theme.dark)}
          >
            <MoonImage isSelected={isDarkTheme} /> <div>Dark</div>
          </div>
          <div
            className={
              'theme-type' + (isLightTheme ? ' theme-type--selected' : '')
            }
            onClick={() => this.updateThemeType(AppConstants.theme.light)}
          >
            <SunImage isSelected={isLightTheme} /> <div>Light</div>
          </div>
        </div>
        <h3>Accent colour</h3>
        <div className="accent-colour">
          <div onClick={this.handleDisplayColorPickerClick}>
            <img src={radioSelect} alt="select accent colour" />
            {accentColour}
          </div>

          {this.state.displayColorPicker ? (
            <div>
              <div onClick={this.handleCloseColorPicker} />
              <SketchPicker
                color={accentColour}
                onChange={this.handleColorChange}
              />
            </div>
          ) : null}
        </div>
      </StyledTheme>
    )
  }
}

export default Theme
