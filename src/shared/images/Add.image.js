import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledAddImage = styled.div`
  width: 24px;
  height: 24px;

  &:hover {
    .add-path {
      fill: ${styleConstants.mainAccent};
    }
  }

  .add-path {
    fill: ${styleConstants.darkThemeLightText};
  }
`

const AddImage = props => {
  return (
    <StyledAddImage {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="add-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 11H13V9C13 8.45 12.55 8 12 8C11.45 8 11 8.45 11 9V11H9C8.45 11 8 11.45 8 12C8 12.55 8.45 13 9 13H11V15C11 15.55 11.45 16 12 16C12.55 16 13 15.55 13 15V13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z"
        />
      </svg>
    </StyledAddImage>
  )
}

export default AddImage
