import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'

const StyledFrames = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};
`

class Frames extends Component {
  state = {}

  render() {
    return <StyledFrames />
  }
}

export default Frames
