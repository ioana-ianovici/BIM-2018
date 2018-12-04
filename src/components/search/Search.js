import React, { PureComponent, Fragment } from 'react'

import UserFilter from './UserFilter'
import ManageUser from './ManageUser'
import plant from './../../assets/default-frame-set-1/plant.svg'

class Search extends PureComponent {
  state = {
    // todo: read users from api.
    allUsers: [
      {
        profileImage: 'lala',
        step: 'sde 1',
        userName: 'user name 1',
        id: 9,
        ladder: 1,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 2',
        id: 10,
        ladder: 2,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 3',
        id: 11,
        ladder: 3,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 4',
        id: 12,
        ladder: 4,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 5',
        id: 13,
        ladder: 5,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 6',
        id: 14,
        ladder: 6,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 7',
        id: 15,
        ladder: 7,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 8',
        id: 16,
        ladder: 8,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
        step: 'sde 1',
        userName: 'user name 9',
        id: 17,
        ladder: 9,
        badges: [
          { id: 1, badge: 'b1', text: 'b1', count: 2 },
          { id: 2, badge: 'b2', text: 'b2', count: 3 },
          { id: 3, badge: 'b3', text: 'b3', count: 5 },
          { id: 4, badge: 'b4', text: 'b4', count: 8 },
        ],
        requirements: [
          { id: 1, text: 'req.', isAccomplished: true },
          { id: 2, text: 'req. 2', isAccomplished: false },
          { id: 3, text: 'req. 3', isAccomplished: true },
          { id: 4, text: 'req. 4', isAccomplished: false },
        ],
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
    this.setState({ selectedUser })
    // todo: redirect to user page if not admin.
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
      <Fragment>
        <UserFilter
          onUserSelect={this.handleUserSelect}
          allUsers={allUsers}
          ladders={ladders}
          requirements={requirements}
          badges={badges}
          steps={steps}
        />
        {selectedUser && <ManageUser user={selectedUser} />}
      </Fragment>
    )
  }
}

export default Search
