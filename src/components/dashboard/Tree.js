import React, { Component } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/constants/styleConstants'
import tree from './../../assets/tree.svg'

const StyledTree = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};
  overflow: hidden;
  height: 100%;

  .tree {
    background-image: url(${tree});
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: cover;
  }

  .tree__step {
    display: block;
    width: 100%;
    height: 100px;
    font-size: 14px;
    color: ${styleConstants.mainAccent};
    position: relative;
    width: 50%;

    &:nth-child(even) {
      left: calc(50% + 20px);
      text-align: left;

      .step__content {
        &:after {
          content: ' ';
          display: block;
          position: absolute;
          border-top: 1px solid ${styleConstants.mainAccent};
          bottom: -5px;
          left: -20px;
          height: 1px;
          width: 100px;
        }
      }
    }

    &:nth-child(odd) {
      margin-right: calc(50% + 20px);
      padding-right: 20px;
      text-align: right;

      .step__content {
        &:after {
          content: ' ';
          display: block;
          position: absolute;
          border-top: 1px solid ${styleConstants.mainAccent};
          bottom: -5px;
          right: -20px;
          height: 1px;
          width: 100px;
        }
      }
    }
  }

  .tree__step:nth-last-child(1) {
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    .step__content {
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
  }

  .step__content {
    position: relative;
  }

  .tree__step--inactive {
    color: ${styleConstants.darkThemePaleText};
  }

  .tree__step--inactive:nth-child(odd) .step__content:after,
  .tree__step--inactive:nth-child(even) .step__content:after,
  .tree__step--inactive:nth-child(1) .step__content:after {
    border-left: 1px solid ${styleConstants.darkThemePaleText};
  }
`

class Tree extends Component {
  render() {
    const { steps } = this.props

    return (
      <StyledTree>
        <div className="tree">
          {steps.reverse().map(step => (
            <div
              key={step.title}
              className={
                'tree__step step' +
                (step.isAchieved ? '' : ' tree__step--inactive')
              }
            >
              <div className="step__content">{step.title}</div>
            </div>
          ))}
        </div>
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
