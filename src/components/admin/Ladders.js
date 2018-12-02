import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { styleConstants } from '../../shared/constants/styleConstants'

const StyledLadders = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .ladder {
    overflow: auto;
  }
`

class Step extends PureComponent {
  setRef = ref => {
    // keep a reference to the dom ref as an instance property
    this.ref = ref
    // give the dom ref to react-beautiful-dnd
    this.props.innerRef(ref)
  }

  render() {
    const { step, provided, innerRef } = this.props

    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={this.setRef}
      >
        {step.name}
      </div>
    )
  }
}

class Ladder extends PureComponent {
  state = this.props.ladder

  constructor(props) {
    super(props)

    this.handleLadderNameChange = this.handleLadderNameChange.bind(this)
    this.reorder = this.reorder.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  // getItemStyle(isDragging, draggableStyle) {
  //   const grid = 8

  //   return {
  //     // some basic styles to make the items look a bit nicer
  //     userSelect: 'none',
  //     padding: grid * 2,
  //     margin: `0 0 ${grid}px 0`,

  //     // styles we need to apply on draggables
  //     ...draggableStyle,
  //   }
  // }

  // getListStyle(isDraggingOver) {
  //   const grid = 8

  //   return {
  //     padding: grid,
  //   }
  // }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }

    const steps = this.reorder(
      this.state.steps,
      result.source.index,
      result.destination.index,
    )

    this.setState(oldState => ({ ...oldState.steps, steps }))
  }

  handleLadderNameChange(event) {
    this.setState({ name: event.target.value })
  }

  render() {
    const { name } = this.state
    console.log(this.state)

    return (
      <div className="ladder">
        <input
          type="text"
          placeholder="Ladder name"
          value={name}
          onChange={this.handleLadderNameChange}
        />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={this.getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided, snapshot) => (
                      <Step
                        innerRef={provided.innerRef}
                        provided={provided}
                        step={step}
                      />
                      // <div
                      // className="step__name"
                      // ref={provided.innerRef}
                      // {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                      //   // style={this.getItemStyle(
                      //   //   snapshot.isDragging,
                      //   //   provided.draggableProps.style,
                      //   // )}
                      // >
                      //   {step.name}
                      // </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}

Ladder.propTypes = {
  ladder: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    steps: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        badge: propTypes.string.isRequired,
        requirements: propTypes.arrayOf(
          propTypes.shape({
            id: propTypes.number.isRequired,
            text: propTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

class Ladders extends PureComponent {
  state = {}

  render() {
    const { ladders } = this.props

    return (
      <StyledLadders>
        {ladders.map(ladder => (
          <Ladder key={ladder.id} ladder={ladder} />
        ))}
      </StyledLadders>
    )
  }
}

Ladders.propTypes = {
  ladders: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      steps: propTypes.arrayOf(
        propTypes.shape({
          id: propTypes.number.isRequired,
          name: propTypes.string.isRequired,
          badge: propTypes.string.isRequired,
          requirements: propTypes.arrayOf(
            propTypes.shape({
              id: propTypes.number.isRequired,
              text: propTypes.string.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
}

export default Ladders
