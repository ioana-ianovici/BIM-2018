import React, { Component } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/styleConstants'

const StyledTree = styled.div`
  /* -ms-box-orient: horizontal;
  display: flex;
  flex-direction: column-reverse;
  align-items: center; */
  overflow: hidden;

  .tree__step {
    display: block;
    width: 100%;
    height: 100px;
    font-size: 14px;
    color: ${styleConstants.mainAccent};
    position: relative;

    &:nth-child(even) {
      left: calc(50% + 20px);
      text-align: left;

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        border-top: 1px solid ${styleConstants.mainAccent};
        top: 25px;
        left: -20px;
        height: 1px;
        width: 100px;
      }
    }

    &:nth-child(odd) {
      right: calc(50% + 20px);
      text-align: right;

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        border-top: 1px solid ${styleConstants.mainAccent};
        top: 25px;
        right: -20px;
        height: 1px;
        width: 100px;
      }
    }
  }

  .tree__step:nth-last-child(1) {
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    &:after {
      content: ' ';
      display: block;
      height: 99999px;
      position: absolute;
      top: -100005px;
      left: 50%;
      border-left: 1px solid ${styleConstants.mainAccent};
    }
  }

  .tree__step--inactive:nth-child(odd):after,
  .tree__step--inactive:nth-child(even):after,
  .tree__step--inactive:nth-child(1):after {
    border-left: 1px solid ${styleConstants.darkThemePaleText};
  }

  .tree__step--inactive {
    color: ${styleConstants.darkThemePaleText};
  }
`

class Tree extends Component {
  render() {
    const { steps } = this.props

    return (
      <StyledTree>
        {steps.reverse().map(step => (
          <div
            key={step.title}
            className={
              'tree__step' + (step.isAchieved ? '' : ' tree__step--inactive')
            }
          >
            {step.title}
          </div>
        ))}
      </StyledTree>
    )
  }
}

Tree.propTypes = {
  steps: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string,
      isAchieved: propTypes.boolean,
    }),
  ),
}

export default Tree
