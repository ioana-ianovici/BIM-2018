import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Select from 'react-select'
import { API } from 'aws-amplify'
import { Storage } from 'aws-amplify'

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
    margin-top: 50px;
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .ladder__name {
    margin-bottom: 50px;
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

  .ladder__collapse {
    cursor: pointer;
    font-size: 30px;
    line-height: 0px;
    display: inline-block;
    margin-right: 30px;

    &:hover {
      color: ${styleConstants.mainAccent};
    }
  }

  .ladder__members {
    margin-bottom: 50px;
    /* max-width: 330px; */
  }

  .ladder__add-new-ladder {
    position: absolute;
    top: 28px;
    left: 200px;
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
        flex-grow: 1;
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

  .ladder--collapsed {
    display: block;
    cursor: pointer;
    border-top: 1px solid ${styleConstants.mainAccent};
    border-bottom: 1px solid ${styleConstants.mainAccent};
    padding: 30px 0px;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;

    &:first-child {
      border-top: none;
    }

    &:last-child {
      border-bottom: none;
    }

    div:first-child {
      width: 60%;
    }
    div:last-child {
      width: 40%;
    }

    .ladder__name {
      margin-bottom: 0;
    }
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
              <img
                src={step.frameImage}
                alt=""
                onClick={this.handleFramesClick}
              /> //todo: add alt
            ) : (
              allFrames.map(frame => (
                <img
                  key={frame.frameId}
                  src={frame.image}
                  className={
                    'frame' +
                    (step.frame === frame.picture ? ' frame--selected' : '')
                  }
                  alt={frame.picture}
                  onClick={() => this.handleFrameChoice(frame.picture)}
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
  allFrames: propTypes.arrayOf(
    propTypes.shape({
      frameId: propTypes.string,
      image: propTypes.string,
      picture: propTypes.string,
    }),
  ).isRequired,
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
    members: this.getMembers(),
    addedMembers: [],
    removedMembers: [],
  }

  getMembers() {
    const members = []

    this.props.ladder.steps.forEach(step => {
      if (step.members) {
        members.push(...step.members)
      }
    })

    return members
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
    this.getMembers = this.getMembers.bind(this)
    this.toggleLadderCollapse = this.toggleLadderCollapse.bind(this)
  }

  toggleLadderCollapse() {
    this.setState(oldState => ({ isCollapsed: !oldState.isCollapsed }))
  }

  onRemoveLadder() {
    // todo: confirm through modal.
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
    Storage.vault.get(steps[stepIndex].frame, { level: 'public' }).then(img => {
      steps[stepIndex].frameImage = img
      this.setState({ steps })
    })
  }

  handleMembersChange(members) {
    const allMembers = this.getMembers()
    let addedMembers = [...this.state.addedMembers]
    let removedMembers = [...this.state.removedMembers]

    const steps = [...this.state.steps].map(step => {
      step.members = (step.members || []).filter(member => {
        const shouldBeKept = members.find(m => m.value === member.value)

        if (!shouldBeKept) {
          if (addedMembers.find(m => m.value === member.value)) {
            addedMembers = addedMembers.filter(m => m.value !== member.value)
          } else if (!removedMembers.find(m => m.value === member.value)) {
            removedMembers.push(member)
          }
        }

        return shouldBeKept
      })

      return step
    })

    steps[0].members.push(
      ...members.filter(m => {
        const isNew = !allMembers.find(member => member.value === m.value)

        if (isNew) {
          if (removedMembers.find(member => m.value === member.value)) {
            removedMembers = removedMembers.filter(
              member => m.value !== member.value,
            )
          } else if (!addedMembers.find(member => member.value === m.value)) {
            addedMembers.push({
              value: m.value,
              title: steps[0].stepId,
              label: m.label,
            })
          }
        }

        return isNew
      }),
    )

    this.setState({ addedMembers })
    this.setState({ removedMembers })
    this.setState({ steps, members })
  }

  handleSubmit() {
    API.post(AppConstants.endpoints.ladders, '', { body: this.state }).then(
      ladder => {
        this.setState({ ...ladder })

        const addLadderToNewMembers = () => {
          const addedMembers = this.state.addedMembers

          return addedMembers.map(member => {
            const body = {
              title: member.title,
              ladder: this.props.ladder.ladderId,
            }

            return API.put(
              AppConstants.endpoints.users,
              `/${member.value}/update-title`,
              {
                body,
              },
            )
          })
        }

        const removeLadderFromRemovedMembers = () => {
          const removedMembers = this.state.removedMembers

          return removedMembers.map(member => {
            const body = {
              title: null,
              ladder: null,
            }

            return API.put(
              AppConstants.endpoints.users,
              `/${member.value}/update-title`,
              {
                body,
              },
            )
          })
        }

        Promise.all([
          ...addLadderToNewMembers(),
          ...removeLadderFromRemovedMembers(),
        ]).then(() => {
          this.props.onLaddersChange()
        })
      },
    )
  }

  render() {
    const ladder = this.state
    const { allFrames, users } = this.props
    const unassignedUsers = users
      .filter(user => !user.ladder)
      .map(user => ({
        label: user.userName,
        value: user.userId,
      }))

    return (
      <Fragment>
        {!ladder.isCollapsed && (
          <div className="ladder">
            <div
              className="ladder__collapse"
              onClick={this.toggleLadderCollapse}
            >
              -
            </div>
            <input
              className="ladder__name"
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
              value={ladder.members}
              options={unassignedUsers}
              onChange={this.handleMembersChange}
              isSearchable={true}
              isMulti={true}
              closeMenuOnSelect={false}
            />

            <button className="save-button" onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        )}

        {ladder.isCollapsed && (
          <div
            className="ladder ladder--collapsed"
            onClick={this.toggleLadderCollapse}
          >
            <div className="ladder__name">{ladder.ladderName}</div>
            <div className="ladder__frame">
              <img
                src={ladder.steps[0] && ladder.steps[0].frameImage}
                alt="Frame of the first step of ladder"
              />
            </div>
          </div>
        )}
      </Fragment>
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
  allFrames: propTypes.arrayOf(
    propTypes.shape({
      frameId: propTypes.string,
      image: propTypes.string,
      picture: propTypes.string,
    }),
  ),
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
    allFrames: [],
  }

  constructor(props) {
    super(props)

    this.getLadders = this.getLadders.bind(this)
    this.handleAddNewLadder = this.handleAddNewLadder.bind(this)

    this.getLadders()

    const getFrames = () => {
      API.get('Frames', '')
        .then(frames => {
          Promise.all(
            frames
              .filter(f => f.picture)
              .map(frame =>
                Storage.vault
                  .get(frame.picture, { level: 'public' })
                  .then(res => {
                    frame.image = res
                  }),
              ),
          ).then(() => {
            this.setState({ allFrames: frames })
          })
        })
        .catch(err => {
          console.log('error loading frames', err)
        })
    }

    getFrames()
  }

  getLadders() {
    API.get(AppConstants.endpoints.ladders, '').then(ladders => {
      ladders = ladders.map(ladder => {
        ladder.isCollapsed = true
        return ladder
      })
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
        <AddNew
          text="Add new ladder"
          className="ladder__add-new-ladder"
          onClick={this.handleAddNewLadder}
        />
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
