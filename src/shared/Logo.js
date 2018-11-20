import React from 'react'
import styled from 'styled-components'
import { styleConstants } from './styleConstants'

const PlainLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 851.84 258.24">
    <title>Logo</title>
    <g id="Layer_1" data-name="Layer 1">
      <text className="text-1" transform="translate(0 165.41)">
        B
      </text>
      <rect
        className="accent-color"
        x="214.58"
        y="27.83"
        width="39"
        height="24"
      />
      <rect
        className="accent-color"
        x="174.58"
        y="84.83"
        width="79"
        height="24"
      />
      <rect
        className="accent-color"
        x="144.58"
        y="141.83"
        width="109"
        height="24"
      />
      <text className="text-2" transform="translate(262.23 165.4)">
        MORE
      </text>
    </g>
  </svg>
)

export const Logo = props => {
  const StyledLogo = styled.div`
    transform: scale(${props => props.scale || 1});

    .text-1,
    .text-2 {
      font-family: HelveticaNeue-Bold, Helvetica Neue, Helvetica;
      font-weight: 700;
      font-size: 193px;
    }
    .text-1,
    .accent-color {
      fill: ${props => props.accentColor || styleConstants.mainAccent};
    }
    .text-2 {
      fill: ${props => props.textColor || '#fff'};
    }
  `

  return (
    <StyledLogo {...props}>
      <PlainLogo />
    </StyledLogo>
  )
}
