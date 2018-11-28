import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'

const StyledSearch = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};
`

class Search extends Component {
  state = {}

  render() {
    return <StyledSearch>search</StyledSearch>
  }
}

export default Search
