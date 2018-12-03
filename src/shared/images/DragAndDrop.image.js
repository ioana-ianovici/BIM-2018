import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledDragAndDropImage = styled.div`
  width: 20px;
  height: 20px;

  &:hover {
    .drag-and-drop-path {
      fill: ${styleConstants.mainAccent};
    }
  }

  .drag-and-drop-path {
    fill: ${styleConstants.darkThemeLightText};
  }
`

const DragAndDropImage = props => {
  return (
    <StyledDragAndDropImage {...props}>
      <svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="drag-and-drop-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2C0 0.896 0.896 0 2 0C3.104 0 4 0.896 4 2C4 3.104 3.104 4 2 4C0.896 4 0 3.104 0 2ZM9 0C7.896 0 7 0.896 7 2C7 3.104 7.896 4 9 4C10.104 4 11 3.104 11 2C11 0.896 10.104 0 9 0ZM16 0C14.896 0 14 0.896 14 2C14 3.104 14.896 4 16 4C17.104 4 18 3.104 18 2C18 0.896 17.104 0 16 0Z"
        />
        <path
          className="drag-and-drop-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 8C0 6.896 0.896 6 2 6C3.104 6 4 6.896 4 8C4 9.104 3.104 10 2 10C0.896 10 0 9.104 0 8ZM9 6C7.896 6 7 6.896 7 8C7 9.104 7.896 10 9 10C10.104 10 11 9.104 11 8C11 6.896 10.104 6 9 6ZM16 6C14.896 6 14 6.896 14 8C14 9.104 14.896 10 16 10C17.104 10 18 9.104 18 8C18 6.896 17.104 6 16 6Z"
        />
      </svg>
    </StyledDragAndDropImage>
  )
}

export default DragAndDropImage
