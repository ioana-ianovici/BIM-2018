import React, { PureComponent, Fragment } from 'react'
import { API, Storage } from 'aws-amplify'

import { AppConstants } from '../../shared/constants/constants'
import UserFilter from './UserFilter'
import ManageUser from './ManageUser'

class Search extends PureComponent {
  state = {
    // todo: read users from api.
    users: [
      // {
      //   profileImage: 'lala',
      //   step: 'sde 1',
      //   userName: 'user name 1',
      //   id: 9,
      //   ladder: 1,
      //   badges: [
      //     { id: 1, badge: 'b1', text: 'b1', count: 2 },
      //     { id: 2, badge: 'b2', text: 'b2', count: 3 },
      //     { id: 3, badge: 'b3', text: 'b3', count: 5 },
      //     { id: 4, badge: 'b4', text: 'b4', count: 8 },
      //   ],
      //   requirements: [
      //     { id: 1, text: 'req.', isAccomplished: true },
      //     { id: 2, text: 'req. 2', isAccomplished: false },
      //     { id: 3, text: 'req. 3', isAccomplished: true },
      //     { id: 4, text: 'req. 4', isAccomplished: false },
      //   ],
      //   userPicture:
      //     'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
      //   userTitle: 'user title',
      //   userTitleProgressPercentage: 45,
      //   userLastTitle: 'Rookie',
      //   userNextTitle: 'Master',
      //   userFrame: plant,
      // },
    ],
    selectedUser: null,
    ladders: [],
    requirements: [],
    badges: [],
    steps: [],
  }

  constructor(props) {
    super(props)

    this.handleUserSelect = this.handleUserSelect.bind(this)

    this.getUsers().then(() => {
      this.getLadders()
      this.getBadges()
    })
  }

  getUsers() {
    return API.get(AppConstants.endpoints.users, '').then(users => {
      this.setState({ users })
    })
  }

  getLadders() {
    API.get(AppConstants.endpoints.ladders, '').then(ladders => {
      let users = this.state.users
      let steps = []
      let requirements = []
      const badges = this.state.badges.map(b => b)

      ladders.forEach(ladder => {
        users
          .filter(user => user.ladder === ladder.ladderId)
          .forEach(user => (user.ladder = ladder))
      })

      ladders.forEach(ladder => {
        steps.push(...ladder.steps)
      })

      users.forEach(user => {
        const titleIndex =
          user.ladder && user.ladder.steps
            ? user.ladder.steps.findIndex(step => user.title === step.stepId)
            : null
        user.userTitle =
          titleIndex != null ? user.ladder.steps[titleIndex].name : null
        user.userLastTitle =
          titleIndex != null
            ? titleIndex > 0
              ? user.ladder.steps[titleIndex - 1].name
              : user.ladder.steps[titleIndex].name
            : null
        user.userNextTitle =
          titleIndex != null
            ? titleIndex < user.ladder.steps.length - 1
              ? user.ladder.steps[titleIndex + 1].name
              : user.ladder.steps[user.ladder.steps.length - 1].name
            : null
      })

      steps.forEach(step => {
        requirements.push(...step.requirements)
      })

      requirements = requirements.map(requirement => ({
        value: requirement.id,
        label: requirement.text,
      }))

      steps = steps.map(step => ({
        value: step.stepId,
        label: step.name,
      }))

      ladders = ladders.map(ladder => ({
        label: ladder.ladderName,
        value: ladder.ladderId,
      }))

      const emptyItem = { label: '', value: null }

      ladders.unshift(emptyItem)
      steps.unshift(emptyItem)
      requirements.unshift(emptyItem)
      badges.unshift(emptyItem)

      this.setState({
        users,
        ladders,
        steps,
        requirements,
        badges,
      })
    })
  }

  getBadges() {
    const allUserBadges = []
    this.state.users.forEach(user => {
      ;(user.badges || []).forEach(badge => {
        if (!allUserBadges.find(b => b === badge)) {
          allUserBadges.push(badge)
        }
      })
    })

    API.get(AppConstants.endpoints.badges, '/' + allUserBadges.toString()).then(
      badges => {
        let users = this.state.users

        Promise.all(
          badges
            .filter(badge => badge.picture)
            .map(badge =>
              Storage.vault
                .get(badge.picture, { level: 'public' })
                .then(res => {
                  badge.picture = res

                  users.forEach(user => {
                    if (user.badge === badge.badgeId) {
                      user.badge = badge
                    }
                  })
                }),
            ),
        ).then(() => {
          this.setState({ badges })
        })
      },
    )
  }

  handleUserSelect(selectedUser) {
    this.setState({ selectedUser })
    // todo: redirect to user page if not admin.
  }

  render() {
    const {
      selectedUser,
      users,
      ladders,
      requirements,
      badges,
      steps,
    } = this.state

    return (
      <Fragment>
        <UserFilter
          users={users}
          ladders={ladders}
          requirements={requirements}
          badges={badges}
          steps={steps}
          onUserSelect={this.handleUserSelect}
        />
        {selectedUser && <ManageUser user={selectedUser} />}
      </Fragment>
    )
  }
}

export default Search
