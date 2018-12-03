import React from 'react'
import styled from 'styled-components'

import { styleConstants } from '../constants/styleConstants'

const StyledSunImage = styled.div`
  width: 30px;
  height: 30px;

  &:hover {
    .sun-path {
      stroke: ${props =>
        props.isSelected
          ? styleConstants.mainAccent
          : styleConstants.darkThemeLightText};
    }
  }
  .sun-path {
    stroke: ${props =>
      props.isSelected
        ? styleConstants.mainAccent
        : styleConstants.darkThemePaleText};
  }
`

const SunImage = props => {
  return (
    <StyledSunImage {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="sun-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6C12.552 6 13 5.553 13 5V3C13 2.447 12.552 2 12 2C11.448 2 11 2.447 11 3V5C11 5.553 11.448 6 12 6ZM12 14C10.897 14 10 13.103 10 12C10 10.897 10.897 10 12 10C13.103 10 14 10.897 14 12C14 13.103 13.103 14 12 14ZM12 8C9.794 8 8 9.794 8 12C8 14.206 9.794 16 12 16C14.206 16 16 14.206 16 12C16 9.794 14.206 8 12 8ZM19 11H21C21.552 11 22 11.447 22 12C22 12.553 21.552 13 21 13H19C18.448 13 18 12.553 18 12C18 11.447 18.448 11 19 11ZM6 12C6 11.447 5.552 11 5 11H3C2.448 11 2 11.447 2 12C2 12.553 2.448 13 3 13H5C5.552 13 6 12.553 6 12ZM4.8067 5.0533C5.1907 4.6573 5.8237 4.6453 6.2207 5.0283L7.6597 6.4183C8.0567 6.8013 8.0677 7.4353 7.6837 7.8323C7.4877 8.0353 7.2267 8.1373 6.9647 8.1373C6.7147 8.1373 6.4647 8.0453 6.2697 7.8573L4.8307 6.4673C4.4337 6.0843 4.4227 5.4503 4.8067 5.0533ZM17.0352 8.1377C17.2852 8.1377 17.5352 8.0447 17.7302 7.8577L19.1692 6.4677C19.5662 6.0837 19.5772 5.4497 19.1932 5.0537C18.8102 4.6577 18.1782 4.6457 17.7792 5.0287L16.3402 6.4177C15.9432 6.8017 15.9322 7.4357 16.3162 7.8317C16.5122 8.0347 16.7732 8.1377 17.0352 8.1377ZM11 19C11 18.447 11.448 18 12 18C12.552 18 13 18.447 13 19V21C13 21.553 12.552 22 12 22C11.448 22 11 21.553 11 21V19ZM17.73 16.1426C17.333 15.7596 16.7 15.7716 16.316 16.1676C15.932 16.5646 15.943 17.1986 16.34 17.5816L17.779 18.9716C17.974 19.1596 18.224 19.2516 18.474 19.2516C18.736 19.2516 18.997 19.1496 19.193 18.9466C19.577 18.5496 19.566 17.9156 19.169 17.5326L17.73 16.1426ZM4.831 17.5326L6.27 16.1426C6.668 15.7596 7.301 15.7716 7.684 16.1676C8.068 16.5646 8.057 17.1986 7.66 17.5816L6.221 18.9716C6.026 19.1596 5.776 19.2516 5.526 19.2516C5.264 19.2516 5.003 19.1496 4.807 18.9466C4.423 18.5496 4.434 17.9156 4.831 17.5326Z"
        />
      </svg>
    </StyledSunImage>
  )
}

export default SunImage
