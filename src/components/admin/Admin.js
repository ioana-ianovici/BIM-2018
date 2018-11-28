import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'

const StyledAdmin = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};
`

class Admin extends Component {
  state = {}

  render() {
    return <StyledAdmin>admin</StyledAdmin>
  }
}

export default Admin
