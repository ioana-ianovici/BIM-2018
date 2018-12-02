import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledLargeRemoveImage = styled.div`
  width: 12px;
  height: 12px;

  &:hover {
    .remove-path {
      fill: ${styleConstants.mainAccent};
    }
  }

  .remove-path {
    fill: white;
  }
`

const LargeRemoveImage = props => {
  return (
    <StyledLargeRemoveImage {...props}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="remove-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4135 0.586476C10.6316 -0.195492 9.36772 -0.195492 8.58578 0.586476L6 3.17237L3.41422 0.586476C2.63228 -0.195492 1.36839 -0.195492 0.586451 0.586476C-0.195484 1.36844 -0.195484 2.63239 0.586451 3.41436L3.17224 6.00025L0.586451 8.58614C-0.195484 9.36811 -0.195484 10.6321 0.586451 11.414C0.976419 11.804 1.48838 12 2.00033 12C2.51229 12 3.02425 11.804 3.41422 11.414L6 8.82813L8.58578 11.414C8.97575 11.804 9.48771 12 9.99967 12C10.5116 12 11.0236 11.804 11.4135 11.414C12.1955 10.6321 12.1955 9.36811 11.4135 8.58614L8.82776 6.00025L11.4135 3.41436C12.1955 2.63239 12.1955 1.36844 11.4135 0.586476Z"
        />
      </svg>
    </StyledLargeRemoveImage>
  )
}

export default LargeRemoveImage
