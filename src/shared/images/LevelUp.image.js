import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledLevelUp = styled.div`
  width: 20px;
  height: 20px;

  &:hover {
    .levelup-path {
      fill: ${styleConstants.mainAccent};
    }
  }

  .levelup-path {
    fill: ${styleConstants.darkThemePaleText};
  }
`

const LevelUp = props => {
  return (
    <StyledLevelUp {...props}>
      <svg
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="levelup-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9925 0.963C17.9905 0.891 17.9695 0.823 17.9505 0.754C17.9355 0.696 17.9285 0.637 17.9035 0.584C17.8805 0.532 17.8415 0.49 17.8075 0.442C17.7655 0.381 17.7275 0.32 17.6735 0.27C17.6645 0.261 17.6605 0.249 17.6505 0.241C17.6145 0.21 17.5705 0.199 17.5315 0.174C17.4715 0.135 17.4125 0.095 17.3445 0.069C17.2775 0.045 17.2115 0.039 17.1425 0.029C17.0945 0.022 17.0515 0 17.0005 0H12.0005C11.4475 0 11.0005 0.448 11.0005 1C11.0005 1.552 11.4475 2 12.0005 2H14.8265L10.7905 6.708L6.5145 4.143C6.0915 3.887 5.5475 3.981 5.2315 4.36L0.231495 10.36C-0.121505 10.784 -0.0645046 11.415 0.359495 11.768C0.547495 11.924 0.773495 12 0.999495 12C1.2865 12 1.5705 11.878 1.7685 11.64L6.2205 6.298L10.4855 8.858C10.9045 9.109 11.4425 9.021 11.7595 8.651L16.0005 3.703V6C16.0005 6.552 16.4475 7 17.0005 7C17.5535 7 18.0005 6.552 18.0005 6V1C18.0005 0.987 17.9935 0.976 17.9925 0.963Z"
        />
      </svg>
    </StyledLevelUp>
  )
}

export default LevelUp
