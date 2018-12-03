import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Select from 'react-select'

import { styleConstants } from '../../shared/constants/styleConstants'
import DragAndDropImage from './../../shared/images/DragAndDrop.image'
import RemoveLargeImage from './../../shared/images/RemoveLarge.image'
import AddNew from './../../shared/AddNew'

const StyledLadders = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .ladders {
    margin-bottom: 50px;
  }

  .ladder {
    /* overflow: auto; */
  }

  .ladder__members {
    /* max-width: 330px; */
  }

  .ladder__add-new-step {
    display: block;
    margin-top: 10px;
    margin-left: 30px;
    margin-bottom: 70px;
  }

  .step {
    cursor: default;
    margin-left: 100px;
    padding: 15px;
    display: flex;

    &:focus {
      outline: none;
    }

    .step__details{
      margin-right: 25px;
      display: flex;
    }

    .step__requirements {
      border: 1px solid ${styleConstants.darkThemePaleText}
      border-radius: 3px;
      padding: 20px 25px;
      margin-right: 25px;
    }

    .step__frames {
      border: 1px solid ${styleConstants.darkThemePaleText}
      border-radius: 3px;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;

      img {
        cursor: pointer;
        width: 50px;
        height: 50px;
      }

      .frame {
        color: ${styleConstants.darkThemePaleText}
        padding: 10px;
      }

      .frame--selected {
        color: ${styleConstants.mainAccent}
      }
    }

    .step__drag {
      cursor: grab;
      display: inline-block;
      margin-right: 10px;
    }

    .step__remove {
      cursor: pointer; 
      margin-left: 10px;
      display: inline-block;
    }
  }

  .requirement {
    .requirement__text {
      margin-bottom: 20px;
    }

    .requirement__remove {
      cursor: pointer; 
      margin-left: 10px;
      display: inline-block;
    }
  }

  .save-button {
    display: block;
    margin: auto;
    margin-bottom: 30px;
  }
`
class Requirement extends PureComponent {
  constructor(props) {
    super(props)

    this.onRequirementRemove = this.onRequirementRemove.bind(this)
    this.onRequirementTextChange = this.onRequirementTextChange.bind(this)
  }

  onRequirementRemove() {
    this.props.onRequirementRemove(this.props.index)
  }

  onRequirementTextChange(event) {
    this.props.onRequirementTextChange(this.props.index, event.target.value)
  }

  render() {
    const { requirement } = this.props

    return (
      <div className="requirement">
        <input
          type="text"
          className="requirement__text"
          placeholder="Requirement name"
          value={requirement.text}
          onChange={this.onRequirementTextChange}
        />
        <RemoveLargeImage
          className="requirement__remove"
          onClick={this.onRequirementRemove}
        />
      </div>
    )
  }
}

Requirement.propTypes = {
  requirement: propTypes.shape({
    id: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
}

class Step extends PureComponent {
  state = {
    isVisibleAllFrames: false,
  }

  constructor(props) {
    super(props)

    this.onStepNameChange = this.onStepNameChange.bind(this)
    this.onStepRemove = this.onStepRemove.bind(this)
    this.onAddNewRequirement = this.onAddNewRequirement.bind(this)
    this.onRequirementRemove = this.onRequirementRemove.bind(this)
    this.handleFramesClick = this.handleFramesClick.bind(this)
    this.handleFrameChoice = this.handleFrameChoice.bind(this)

    // cal api to get all frames, set state.
  }

  setRef = ref => {
    // keep a reference to the dom ref as an instance property
    this.ref = ref
    // give the dom ref to react-beautiful-dnd
    this.props.innerRef(ref)
  }

  onStepNameChange(event) {
    this.props.onStepNameChange(this.props.index, event.target.value)
  }

  onAddNewRequirement() {
    this.props.onAddNewRequirement(this.props.index)
  }

  onStepRemove() {
    this.props.onStepRemove(this.props.index)
  }

  onRequirementRemove(requirementIndex) {
    this.props.onRequirementRemove(this.props.index, requirementIndex)
  }

  handleFramesClick() {
    this.setState({ isVisibleAllFrames: true })
  }

  handleFrameChoice(frame) {
    this.props.handleFrameChoice(this.props.index, frame)
    this.setState({ isVisibleAllFrames: false })
  }

  render() {
    const { isVisibleAllFrames } = this.state
    const { step, provided, allFrames } = this.props

    return (
      <div
        className="step"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={this.setRef}
        tabIndex="-1"
      >
        <div className="step__details">
          <DragAndDropImage className="step__drag" />
          <input
            type="text"
            value={step.name}
            onChange={this.onStepNameChange}
          />
          <RemoveLargeImage
            className="step__remove"
            onClick={this.onStepRemove}
          />
        </div>
        <div className="step__requirements">
          {step.requirements.map((requirement, index) => (
            <Requirement
              key={index}
              index={index}
              requirement={requirement}
              onRequirementRemove={this.onRequirementRemove}
            />
          ))}
          <AddNew
            text="Add new requirement"
            className="ladder__add-new-requirement"
            onClick={this.onAddNewRequirement}
          />
        </div>
        <div>
          <div className="step__frames">
            {!isVisibleAllFrames ? (
              <img src={step.frame} alt="" onClick={this.handleFramesClick} /> //todo: add alt
            ) : (
              allFrames.map((frame, index) => (
                <img
                  key={index}
                  src={frame}
                  className={
                    'frame' + (step.frame === frame ? ' frame--selected' : '')
                  }
                  alt="frame"
                  onClick={() => this.handleFrameChoice(frame)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

Step.propTypes = {
  step: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    frame: propTypes.string.isRequired,
    requirements: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        text: propTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  provided: propTypes.shape({
    draggableProps: propTypes.any,
    dragHandleProps: propTypes.any,
  }).isRequired,
  allFrames: propTypes.arrayOf(propTypes.string).isRequired,
  index: propTypes.number.isRequired,
  onStepNameChange: propTypes.func.isRequired,
  onStepRemove: propTypes.func.isRequired,
  onAddNewRequirement: propTypes.func.isRequired,
  onRequirementRemove: propTypes.func.isRequired,
  handleFrameChoice: propTypes.func.isRequired,
}

class Ladder extends PureComponent {
  state = {
    ...this.props.ladder,
    members: this.props.ladder.members.map(member => ({
      label: member.userName,
      value: member.id,
    })),
  }

  constructor(props) {
    super(props)

    this.handleLadderNameChange = this.handleLadderNameChange.bind(this)
    this.reorder = this.reorder.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleStepNameChange = this.handleStepNameChange.bind(this)
    this.handleStepRemove = this.handleStepRemove.bind(this)
    this.handleAddNewRequirement = this.handleAddNewRequirement.bind(this)
    this.handleRequirementRemove = this.handleRequirementRemove.bind(this)
    this.handleAddNewStep = this.handleAddNewStep.bind(this)
    this.handleFrameChoice = this.handleFrameChoice.bind(this)
    this.handleMembersChange = this.handleMembersChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }

    const steps = this.reorder(
      this.state.steps,
      result.source.index,
      result.destination.index,
    )

    this.setState(oldState => ({ ...oldState, steps }))
  }

  handleLadderNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleStepNameChange(index, name) {
    const steps = this.state.steps.map((step, indx) =>
      indx === index ? { ...step, name } : step,
    )
    this.setState({ steps })
  }

  handleStepRemove(index) {
    const steps = this.state.steps.filter((step, indx) => indx !== index)
    this.setState({ steps })
  }

  handleAddNewRequirement(index) {
    const requirements = JSON.parse(
      JSON.stringify(
        this.state.steps.find((step, indx) => indx === index).requirements,
      ),
    )
    requirements.push({ text: '', id: 0 })
    const steps = this.state.steps.map((step, indx) =>
      indx === index ? { ...step, requirements } : step,
    )
    this.setState({ steps })
  }

  handleRequirementRemove(stepIndex, requirementIndex) {
    const step = this.state.steps.find((step, indx) => indx === stepIndex)
    step.requirements.splice(requirementIndex, 1)
    const steps = this.state.steps.map((step, indx) =>
      indx === stepIndex ? { ...step, requirements: step.requirements } : step,
    )
    this.setState({ steps })
  }

  handleAddNewStep() {
    const steps = this.state.steps.map(step => step)

    steps.push({
      name: null,
      frame: null,
      requirements: [],
    })

    this.setState({ steps })
  }

  handleFrameChoice(stepIndex, frame) {
    const steps = this.state.steps.map((step, indx) =>
      indx === stepIndex ? { ...step, frame } : step,
    )
    this.setState({ steps })
  }

  handleMembersChange(members) {
    this.setState(oldState => ({ ...oldState, members }))
  }

  handleSubmit() {
    console.log(this.state)
    // todo: call api.
  }

  render() {
    const ladder = this.state
    const { allFrames, users } = this.props

    return (
      <div className="ladder">
        <input
          type="text"
          placeholder="Ladder name"
          value={ladder.name}
          onChange={this.handleLadderNameChange}
        />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {ladder.steps.map((step, index) => (
                  <Draggable
                    key={index}
                    draggableId={'a' + index}
                    index={index}
                  >
                    {provided => (
                      <Step
                        index={index}
                        innerRef={provided.innerRef}
                        provided={provided}
                        step={step}
                        allFrames={allFrames}
                        onStepNameChange={this.handleStepNameChange}
                        onStepRemove={this.handleStepRemove}
                        onAddNewRequirement={this.handleAddNewRequirement}
                        onRequirementRemove={this.handleRequirementRemove}
                        handleFrameChoice={this.handleFrameChoice}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <AddNew
          text="Add new step"
          className="ladder__add-new-step"
          onClick={this.handleAddNewStep}
        />

        <Select
          placeholder="Select members"
          className="ladder__members"
          classNamePrefix="react-select"
          value={ladder.members}
          options={users.map(user => ({
            label: user.userName,
            value: user.id,
          }))}
          onChange={this.handleMembersChange}
          isSearchable={true}
          isMulti={true}
          closeMenuOnSelect={false}
        />
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
        frame: propTypes.string.isRequired,
        requirements: propTypes.arrayOf(
          propTypes.shape({
            id: propTypes.number.isRequired,
            text: propTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
    members: propTypes.arrayOf(
      propTypes.shape({
        profileImage: propTypes.string.isRequired,
        userName: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
  allFrames: propTypes.arrayOf(propTypes.string),
  users: propTypes.arrayOf(
    propTypes.shape({
      profileImage: propTypes.string.isRequired,
      userName: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

class Ladders extends PureComponent {
  state = {
    // allFrames: [], // todo: unocmment this, remove next, read from api.
    allFrames: ['frame x', 'frame y', 'frame a', 'frame b', 'frame c'],
  }

  render() {
    const { ladders, users } = this.props
    const { allFrames } = this.state

    return (
      <StyledLadders>
        <div className="ladders">
          {ladders.map((ladder, index) => (
            <Ladder
              key={index}
              index={index}
              ladder={ladder}
              allFrames={allFrames}
              users={users}
            />
          ))}
        </div>

        <button className="save-button" onClick={this.handleSubmit}>
          Save
        </button>
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
          frame: propTypes.string.isRequired,
          requirements: propTypes.arrayOf(
            propTypes.shape({
              id: propTypes.number.isRequired,
              text: propTypes.string.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
      ).isRequired,
      members: propTypes.arrayOf(
        propTypes.shape({
          profileImage: propTypes.string.isRequired,
          userName: propTypes.string.isRequired,
          id: propTypes.number.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
  users: propTypes.arrayOf(
    propTypes.shape({
      profileImage: propTypes.string.isRequired,
      userName: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
    }),
  ),
}

export default Ladders
