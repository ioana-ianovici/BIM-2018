import React from 'react'
import styled from 'styled-components'

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
`

const AddNew = props => {
  return (
    <StyledAddNew {...props}>
      <AddImage className="add-new__icon" />
      <div className="add-new__text">Add new badge</div>
    </StyledAddNew>
  )
}

export default AddNew
