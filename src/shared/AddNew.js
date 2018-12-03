import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import AddImage from './images/Add.image'
import { styleConstants } from './constants/styleConstants'

const StyledAddNew = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;

    .add-new__icon path {
      fill: ${styleConstants.mainAccent};
    }

    .add-new__text {
      color: ${styleConstants.mainAccent};
    }
  }

  .add-new__icon {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }

  .add-new__text {
    display: inline-block;
    vertical-align: middle;
  }
`

const AddNew = props => {
  return (
    <StyledAddNew {...props}>
      <AddImage className="add-new__icon" />
      <div className="add-new__text">{props.text}</div>
    </StyledAddNew>
  )
}

AddNew.propTypes = {
  text: propTypes.string,
}

export default AddNew
