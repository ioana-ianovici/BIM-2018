import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

import styled from 'styled-components'

const StyledPane = styled.div`
  .pane-toggler {
    cursor: pointer;
  }
`

class Pane extends PureComponent {
  state = {
    isOpen: false,
  }

  constructor(props) {
    super(props)

    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    this.setState(oldState => ({ isOpen: !oldState.isOpen }))
  }

  render() {
    const { isOpen } = this.state
    const { title, children } = this.props

    return (
      <StyledPane isOpen={isOpen}>
        <section>
          <h2 className="pane-toggler" onClick={this.toggleOpen}>
            {title}
          </h2>
          {isOpen ? children : null}
        </section>
      </StyledPane>
    )
  }
}

Pane.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
  title: propTypes.string.isRequired,
}

export default Pane
