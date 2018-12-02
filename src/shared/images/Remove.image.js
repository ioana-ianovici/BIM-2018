import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledRemoveImage = styled.div`
  width: 20px;
  height: 20px;

  &:hover {
    .remove-path {
      fill: ${styleConstants.mainAccent};
    }
  }

  .remove-path {
    fill: white;
  }
`

const RemoveImage = props => {
  return (
    <StyledRemoveImage {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="remove-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.707 7.293C12.316 6.902 11.684 6.902 11.293 7.293L10 8.586L8.707 7.293C8.316 6.902 7.684 6.902 7.293 7.293C6.902 7.684 6.902 8.316 7.293 8.707L8.586 10L7.293 11.293C6.902 11.684 6.902 12.316 7.293 12.707C7.488 12.902 7.744 13 8 13C8.256 13 8.512 12.902 8.707 12.707L10 11.414L11.293 12.707C11.488 12.902 11.744 13 12 13C12.256 13 12.512 12.902 12.707 12.707C13.098 12.316 13.098 11.684 12.707 11.293L11.414 10L12.707 8.707C13.098 8.316 13.098 7.684 12.707 7.293ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
        />
      </svg>
    </StyledRemoveImage>
  )
}

export default RemoveImage
