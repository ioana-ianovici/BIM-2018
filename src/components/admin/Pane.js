import React, { PureComponent } from 'react'
import propTypes from 'prop-types'

import styled from 'styled-components'

const StyledPane = styled.div`
  section {
    cursor: ${props => (props.isOpen ? 'default' : 'pointer')};
  }
`

class Pane extends PureComponent {
  state = {
    isOpen: true,
  }

  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  render() {
    const { isOpen } = this.state
    const { title, children } = this.props

    return (
      <StyledPane isOpen={isOpen}>
        <section onClick={this.handleOpen}>
          <h2>{title}</h2>
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
