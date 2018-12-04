import React, { Component } from 'react'
import styled from 'styled-components'

import { styleConstants } from '../../shared/constants/styleConstants'
import UserFilter from './UserFilter'
import plant from './../../assets/default-frame-set-1/plant.svg'

const StyledSearch = styled.div``

class Search extends Component {
  state = {
    // todo: read users from api.
    allUsers: [
      {
        profileImage: 'lala',
        userName: 'user name 1',
        id: 9,
        ladder: 1,
        step: 1,
        badge: 1,
        requirements: [1],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 2',
        id: 10,
        ladder: 2,
        step: 2,
        badge: 2,
        requirements: [2],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 3',
        id: 11,
        ladder: 3,
        step: 3,
        badge: 3,
        requirements: [3],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 4',
        id: 12,
        ladder: 4,
        step: 4,
        badge: 4,
        requirements: [4],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 5',
        id: 13,
        ladder: 5,
        step: 5,
        badge: 5,
        requirements: [5],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 6',
        id: 14,
        ladder: 6,
        step: 6,
        badge: 6,
        requirements: [6],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 7',
        id: 15,
        ladder: 7,
        step: 7,
        badge: 7,
        requirements: [7],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 8',
        id: 16,
        ladder: 8,
        step: 8,
        badge: 8,
        requirements: [8],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
      {
        profileImage: 'lala',
        userName: 'user name 9',
        id: 17,
        ladder: 9,
        step: 9,
        badge: 9,
        requirements: [9],
        userPicture:
          'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
        userTitle: 'user title',
        userTitleProgressPercentage: 45,
        userLastTitle: 'Rookie',
        userNextTitle: 'Master',
        userFrame: plant,
      },
    ],
    selectedUser: null,
    // todo: read from api.
    allLadders: [
      {
        id: 1,
        name: 'Development',
      },
      {
        id: 2,
        name: 'QA',
      },
      {
        id: 3,
        name: 'Design',
      },
      {
        id: 4,
        name: 'Management',
      },
      {
        id: 5,
        name: 'Marketing',
      },
      {
        id: 6,
        name: 'DevOps',
      },
    ],
    // todo: map allLadders
    ladders: [
      { value: null, label: 'empty...' },
      {
        value: 1,
        label: 'Development',
      },
      {
        value: 2,
        label: 'QA',
      },
      {
        value: 3,
        label: 'Design',
      },
      {
        value: 4,
        label: 'Management',
      },
      {
        value: 5,
        label: 'Marketing',
      },
      {
        value: 6,
        label: 'DevOps',
      },
    ],
    // todo: read from api.
    allRequirements: [
      {
        id: 1,
        text: 'is able to abc',
      },
      {
        id: 2,
        text: 'is able to def',
      },
      {
        id: 3,
        text: 'is able to ghi',
      },
      {
        id: 4,
        text: 'is able to jkl',
      },
      {
        id: 5,
        text: 'is able to mno',
      },
      {
        id: 6,
        text: 'is able to pqr',
      },
      {
        id: 7,
        text: 'is able to stu',
      },
    ],
    //todo: map from allRequirements
    requirements: [
      { value: null, label: 'empty...' },
      {
        value: 1,
        label: 'is able to abc',
      },
      {
        value: 2,
        label: 'is able to def',
      },
      {
        value: 3,
        label: 'is able to ghi',
      },
      {
        value: 4,
        label: 'is able to jkl',
      },
      {
        value: 5,
        label: 'is able to mno',
      },
      {
        value: 6,
        label: 'is able to pqr',
      },
      {
        value: 7,
        label: 'is able to stu',
      },
    ],
    // todo: read from api.
    badges: [
      {
        id: 1,
        text: 'b1',
        url: 'bb1',
      },
      {
        id: 2,
        text: 'b2',
        url: 'bb2',
      },
      {
        id: 3,
        text: 'b3',
        url: 'bb13',
      },
      {
        id: 4,
        text: 'b4',
        url: 'bb4',
      },
      {
        id: 5,
        text: 'b5',
        url: 'bb5',
      },
    ],
    // todo: read from api.
    allSteps: [
      {
        id: 1,
        text: 'step 1',
      },
      {
        id: 2,
        text: 'step 2',
      },
      {
        id: 3,
        text: 'step 3',
      },
      {
        id: 4,
        text: 'step 4',
      },
      {
        id: 5,
        text: 'step 5',
      },
      {
        id: 6,
        text: 'step 6',
      },
    ],
    // todo: map from allSteps.
    steps: [
      { value: null, label: '' },
      {
        value: 1,
        label: 'step 1',
      },
      {
        value: 2,
        label: 'step 2',
      },
      {
        value: 3,
        label: 'step 3',
      },
      {
        value: 4,
        label: 'step 4',
      },
      {
        value: 5,
        label: 'step 5',
      },
      {
        value: 6,
        label: 'step 6',
      },
    ],
  }

  constructor(props) {
    super(props)

    this.handleUserSelect = this.handleUserSelect.bind(this)
  }

  handleUserSelect(selectedUser) {
    debugger
    this.setState({ selectedUser })
  }

  render() {
    const {
      selectedUser,
      allUsers,
      ladders,
      requirements,
      badges,
      steps,
    } = this.state

    return (
      <StyledSearch>
        <UserFilter
          onUserSelect={this.handleUserSelect}
          allUsers={allUsers}
          selectedUser={selectedUser}
          ladders={ladders}
          requirements={requirements}
          badges={badges}
          steps={steps}
        />
        {/* todo: add selected user card if selected user */}
        {selectedUser && selectedUser.userName}
      </StyledSearch>
    )
  }
}

export default Search
