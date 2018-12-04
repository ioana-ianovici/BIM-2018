import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import { styleConstants } from './constants/styleConstants'
import Requirement from './Requirement'

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

class Requirements extends PureComponent {
  render() {
    const { requirements } = this.props

    return (
      <StyledRequirements>
        <h2 className="section-right__title">Requirements</h2>
        {requirements.map((requirement, i) => (
          <Requirement
            {...requirement}
            key={i}
            onSelect={this.props.onSelect}
          />
        ))}
      </StyledRequirements>
    )
  }
}

Requirements.propTypes = {
  requirements: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      text: propTypes.string,
      isAccomplished: propTypes.boolean,
    }),
  ),
  onSelect: propTypes.func,
}

export default Requirements
