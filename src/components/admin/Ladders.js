import React, { PureComponent } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Select from 'react-select'
import { API } from 'aws-amplify'

import Spinner from '../../shared/Spinner'
import { styleConstants } from '../../shared/constants/styleConstants'
import { AppConstants } from '../../shared/constants/constants'
import DragAndDropImage from './../../shared/images/DragAndDrop.image'
import RemoveLargeImage from './../../shared/images/RemoveLarge.image'
import AddNew from './../../shared/AddNew'

const StyledLadders = styled.div`
  color: ${styleConstants.darkThemeContrastTextColor};

  .ladders {
  }

  .ladder {
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .ladder__remove {
    display: inline-block;
    margin-left: 30px;
    background: transparent;
    color: ${styleConstants.darkThemeLightText};

    &:hover {
      color: ${styleConstants.mainAccent};
    }
  }

  .ladder__members {
    margin-bottom: 50px;
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

    .step__details {
      margin-right: 25px;
      display: flex;
    }

    .step__requirements {
      border: 1px solid ${styleConstants.darkThemePaleText};
      border-radius: 3px;
      padding: 20px 25px;
      margin-right: 25px;
    }

    .step__frames {
      border: 1px solid ${styleConstants.darkThemePaleText};
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
        color: ${styleConstants.darkThemePaleText};
        padding: 10px;
      }

      .frame--selected {
        color: ${styleConstants.mainAccent};
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
  // todo: make req. them as card when click outside.
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
          value={requirement.text || ''}
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
    id: propTypes.string,
    text: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
  onRequirementTextChange: propTypes.func.isRequired,
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
    this.onRequirementTextChange = this.onRequirementTextChange.bind(this)
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

  onRequirementTextChange(requirementId, text) {
    this.props.onRequirementTextChange(this.props.index, requirementId, text)
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
            value={step.name || ''}
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
              key={requirement.requirementId || index}
              index={index}
              requirement={requirement}
              onRequirementRemove={this.onRequirementRemove}
              onRequirementTextChange={this.onRequirementTextChange}
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
    stepId: propTypes.string,
    name: propTypes.string,
    frame: propTypes.string,
    requirements: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.string,
        text: propTypes.string,
      }),
    ),
  }),
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
    members: this.props.ladder.members
      ? this.props.ladder.members.map(member => ({
          label: member.userName,
          value: member.userId,
        }))
      : [],
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
    this.handleRequirementTextChange = this.handleRequirementTextChange.bind(
      this,
    )
    this.handleAddNewStep = this.handleAddNewStep.bind(this)
    this.handleFrameChoice = this.handleFrameChoice.bind(this)
    this.handleMembersChange = this.handleMembersChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onRemoveLadder = this.onRemoveLadder.bind(this)
  }

  onRemoveLadder() {
    // todo: confirm through modal.
    debugger
    API.del(
      AppConstants.endpoints.ladders,
      `/${this.props.ladder.ladderId}`,
    ).then(() => {
      this.props.onLaddersChange()
    })
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
    this.setState({ ladderName: event.target.value })
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
    requirements.push({ text: '' })
    const steps = this.state.steps.map((step, indx) =>
      indx === index ? { ...step, requirements } : step,
    )
    this.setState({ steps })
  }

  handleRequirementRemove(stepIndex, requirementIndex) {
    const step = this.state.steps.find((_, indx) => indx === stepIndex)
    step.requirements.splice(requirementIndex, 1)
    const steps = this.state.steps.map((step, indx) =>
      indx === stepIndex ? { ...step, requirements: step.requirements } : step,
    )

    this.setState({ steps })
  }

  handleRequirementTextChange(stepIndex, requirementIndex, text) {
    const step = this.state.steps.find((_, indx) => indx === stepIndex)
    const requirements = step.requirements.map((requirement, indx) =>
      requirementIndex === indx ? { ...requirement, text } : requirement,
    )
    const steps = this.state.steps.map((step, indx) =>
      indx === stepIndex ? { ...step, requirements } : step,
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
    API.post(AppConstants.endpoints.ladders, '', { body: this.state }).then(
      ladder => {
        this.setState({ ...ladder })
        this.props.onLaddersChange()
      },
    )
  }

  render() {
    const ladder = this.state
    const { allFrames, users } = this.props

    return (
      <div className="ladder">
        <input
          type="text"
          placeholder="Ladder name"
          value={ladder.ladderName || ''}
          onChange={this.handleLadderNameChange}
        />
        <RemoveLargeImage
          className="ladder__remove"
          onClick={this.onRemoveLadder}
        />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {ladder.steps.map((step, index) => (
                  <Draggable
                    key={step.stepId || index}
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
                        onRequirementTextChange={
                          this.handleRequirementTextChange
                        }
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
          value={ladder.members || []}
          options={users.map(user => ({
            label: user.userName,
            value: user.userId,
          }))}
          onChange={this.handleMembersChange}
          isSearchable={true}
          isMulti={true}
          closeMenuOnSelect={false}
        />

        <button className="save-button" onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    )
  }
}

Ladder.propTypes = {
  ladder: propTypes.shape({
    ladderId: propTypes.string,
    ladderName: propTypes.string,
    steps: propTypes.arrayOf(
      propTypes.shape({
        stepId: propTypes.string,
        name: propTypes.string,
        frame: propTypes.string,
        requirements: propTypes.arrayOf(
          propTypes.shape({
            id: propTypes.string,
            text: propTypes.string,
          }),
        ),
      }),
    ),
    members: propTypes.arrayOf(
      propTypes.shape({
        picture: propTypes.string,
        userName: propTypes.string,
        userId: propTypes.string.isRequired,
      }).isRequired,
    ), // todo: remove? move to step?
  }).isRequired,
  index: propTypes.number.isRequired,
  allFrames: propTypes.arrayOf(propTypes.string),
  users: propTypes.arrayOf(
    propTypes.shape({
      picture: propTypes.string,
      userName: propTypes.string,
      userId: propTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onLaddersChange: propTypes.func.isRequired,
}

class Ladders extends PureComponent {
  // todo: make ladders collapsible.
  state = {
    ladders: [],
    // allFrames: [], // todo: unocmment this, remove next, read from api.
    allFrames: ['frame x', 'frame y', 'frame a', 'frame b', 'frame c'],
  }

  constructor(props) {
    super(props)

    this.getLadders = this.getLadders.bind(this)
    this.handleAddNewLadder = this.handleAddNewLadder.bind(this)

    this.getLadders()
  }

  getLadders() {
    API.get(AppConstants.endpoints.ladders, '').then(ladders => {
      this.setState({ ladders })
    })
  }

  handleAddNewLadder() {
    const ladders = [
      ...this.state.ladders,
      { ladderName: '', steps: [], members: [] },
    ]
    this.setState({ ladders })
  }

  render() {
    const { users } = this.props
    const { ladders, allFrames } = this.state

    return (
      <StyledLadders>
        <div className="ladders">
          {ladders &&
            ladders.map((ladder, index) => (
              <Ladder
                key={ladder.ladderId || index}
                index={index}
                ladder={ladder}
                allFrames={allFrames}
                users={users}
                onLaddersChange={this.getLadders}
              />
            ))}
          {(!ladders || !ladders.length) && <Spinner />}
        </div>

        <AddNew
          text="Add new ladder"
          className="ladder__add-new-step"
          onClick={this.handleAddNewLadder}
        />
      </StyledLadders>
    )
  }
}

Ladders.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      picture: propTypes.string,
      userName: propTypes.string,
      userId: propTypes.string.isRequired,
    }),
  ),
}

export default Ladders
