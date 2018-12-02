import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledConfirmImage = styled.div`
  width: 20px;
  height: 20px;

  &:hover {
    .sign,
    .circle {
      fill: ${styleConstants.mainAccent};
    }
  }

  .sign {
    fill: white;
  }

  .circle {
    fill: white;
  }
`

const ConfirmImage = props => {
  return (
    <StyledConfirmImage {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="sign"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2049 6.39443L8.4209 11.3634L6.7879 9.27743C6.4469 8.84143 5.8189 8.76543 5.3839 9.10643C4.9489 9.44643 4.8719 10.0754 5.2129 10.5094L7.6439 13.6164C7.8339 13.8584 8.1239 13.9994 8.4319 13.9994H8.4389C8.7479 13.9984 9.0399 13.8524 9.2269 13.6054L13.7959 7.60543C14.1309 7.16543 14.0459 6.53943 13.6059 6.20443C13.1659 5.86943 12.5379 5.95543 12.2049 6.39443Z"
        />
        <path
          className="circle"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
        />
      </svg>
    </StyledConfirmImage>
  )
}

export default ConfirmImage
