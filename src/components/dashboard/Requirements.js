import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { styleConstants } from '../../shared/constants/styleConstants'

const StyledRequirements = styled.div`
  p {
    margin-top: 0;
  }

  .section-right__title {
    margin-top: 0;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-weight: 300;
    line-height: 31px;
    font-size: 21px;
    text-transform: uppercase;
  }

  .section-right__text {
    font-weight: normal;
    line-height: 18px;
    font-size: 14px;
  }

  .section-right__text--inactive {
    color: ${styleConstants.darkThemePaleText};
  }
`

class Requirement extends PureComponent {
  render() {
    const { isAccomplished, text } = this.props

    return (
      <p
        className={
          'section-right__text' +
          (isAccomplished ? '' : ' section-right__text--inactive')
        }
      >
        {text}
      </p>
    )
  }
}

Requirement.propTypes = {
  requirement: propTypes.shape({
    text: propTypes.string,
    isAccomplished: propTypes.boolean,
  }),
}

class Requirements extends PureComponent {
  render() {
    const { requirements } = this.props

    return (
      <StyledRequirements>
        <h2 className="section-right__title">Requirements</h2>
        {requirements.map((requirement, i) => (
          <Requirement {...requirement} key={i} />
        ))}
      </StyledRequirements>
    )
  }
}

Requirements.propTypes = {
  requirements: propTypes.arrayOf(
    propTypes.shape({
      text: propTypes.string,
      isAccomplished: propTypes.boolean,
    }),
  ),
}

export default Requirements
