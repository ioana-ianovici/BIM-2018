import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

class Requirement extends PureComponent {
  render() {
    const { isAccomplished, text, id } = this.props

    return (
      <p
        className={
          'requirement section-right__text' +
          (isAccomplished ? '' : ' section-right__text--inactive')
        }
        onClick={() => this.props.onSelect(id)}
      >
        {text}
      </p>
    )
  }
}

Requirement.propTypes = {
  requirement: propTypes.shape({
    id: propTypes.number,
    text: propTypes.string,
    isAccomplished: propTypes.boolean,
  }),
  onSelect: propTypes.func,
}

export default Requirement
