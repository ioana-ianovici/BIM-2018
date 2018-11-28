import React from 'react'
import styled from 'styled-components'
import { styleConstants } from './constants/styleConstants'

const StyledSpinner = styled.div`
  display: inline-block;
  display: table;
  width: 100%;
  height: 100%;

  .spinner-wrapper {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    transform: translateZ(1px);
    background-color: ${styleConstants.darkThemePrimaryBackground}
      /* todo: read bgcolor by theme */ div {
      width: 51px;
      height: 51px;
      margin: 6px auto;
      border-radius: 50%;
      background: #fff;
      animation: spinner 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
  }

  @keyframes spinner {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="spinner-wrapper">
        <div />
      </div>
    </StyledSpinner>
  )
}

export default Spinner
