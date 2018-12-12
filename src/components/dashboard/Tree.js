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
    background-size: contain;
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
          border-bottom: 1px solid #09e8c2;
          bottom: -5px;
          left: -20px;
          height: 300px;
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
          border-bottom: 1px solid ${styleConstants.mainAccent};
          bottom: -5px;
          right: -20px;
          height: 300px;
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
        border-bottom: none;
      }
    }
  }

  .step__content {
    position: relative;
  }

  .tree__step--inactive {
    color: ${styleConstants.darkThemePaleText};
  }

  .tree__step--inactive:nth-child(odd) .step__content:after {
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    border-right: 3px solid ${styleConstants.darkThemePaleText};
    z-index: 1;
    margin-right: -2px;
  }

  .tree__step--inactive:nth-child(even) .step__content:after {
    border-bottom: 1px solid ${styleConstants.darkThemePaleText};
    border-left: 3px solid ${styleConstants.darkThemePaleText};
    z-index: 1;
    margin-left: -1px;
  }

  .tree__step:nth-child(1) {
    margin: 0 auto 90px auto;
    padding: 0 0 10px 0;
    width: 100%;
    height: 100%;
    background: ${styleConstants.darkThemePrimaryBackground};
    text-align: center;
    z-index: 2;

    .step__content:after {
      border-bottom: none;
      border-right: none;
      border-left: none;
    }
  }
`

class Tree extends Component {
  render() {
    const { steps } = this.props

    return (
      <StyledTree>
        <div className="tree">
          {[...steps].reverse().map(step => (
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
