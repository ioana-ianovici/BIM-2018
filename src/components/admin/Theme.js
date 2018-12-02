import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'

const StyledTheme = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};
`

class Theme extends Component {
  state = {}

  render() {
    return <StyledTheme />
  }
}

export default Theme
