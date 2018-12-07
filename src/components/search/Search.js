import React, { PureComponent, Fragment } from 'react'
import { API, Storage } from 'aws-amplify'

import { AppConstants } from '../../shared/constants/constants'
import Spinner from '../../shared/Spinner'
import UserFilter from './UserFilter'
import ManageUser from './ManageUser'

class Search extends PureComponent {
  state = {
    users: [],
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
      this.getBadges().then(() => {
        this.getLadders()
      })
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
        if (user.ladder) {
          const titleIndex =
            user.ladder && user.ladder.steps
              ? user.ladder.steps.findIndex(step => user.title === step.stepId)
              : null
          user.userTitle =
            titleIndex !== -1 ? user.ladder.steps[titleIndex].name : null
          user.userLastTitle =
            titleIndex !== -1
              ? titleIndex > 0
                ? user.ladder.steps[titleIndex - 1].name
                : user.ladder.steps[titleIndex].name
              : null
          user.userNextTitle =
            titleIndex !== -1
              ? titleIndex < user.ladder.steps.length - 1
                ? user.ladder.steps[titleIndex + 1].name
                : user.ladder.steps[user.ladder.steps.length - 1].name
              : null
          user.badges = (user.badges || []).map(badge =>
            this.state.badges.find(b => b.badgeId === badge),
          )
          user.frame = user.ladder.steps[titleIndex].frameImage
          console.log(user)
          user.requirements = JSON.parse(
            JSON.stringify(
              user.ladder && user.ladder.steps && user.title
                ? user.ladder.steps
                    .find(step => step.stepId === user.title)
                    .requirements.map(requirement => {
                      requirement.isAccomplished = Boolean(
                        user.confirmedRequirements &&
                          user.confirmedRequirements.find(
                            r => r === requirement.id,
                          ),
                      )
                      return requirement
                    })
                : [],
            ),
          )
          user.userTitleProgressPercentage =
            user.requirements && user.requirements.length
              ? Math.ceil(
                  (user.requirements.filter(
                    requirement => requirement.isAccomplished,
                  ).length /
                    user.requirements.length) *
                    100,
                )
              : 0
        }
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
    return API.get('Badges', '', {}).then(badges => {
      let users = this.state.users

      Promise.all(
        badges
          .filter(b => b.picture)
          .map(badge =>
            Storage.vault.get(badge.picture, { level: 'public' }).then(res => {
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
    })
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

    return users &&
      ladders &&
      requirements &&
      badges &&
      steps &&
      (users.length ||
        ladders.length ||
        requirements.length ||
        badges.length ||
        steps.length) ? (
      <Fragment>
        <UserFilter
          users={users}
          ladders={ladders}
          requirements={requirements}
          badges={badges}
          steps={steps}
          onUserSelect={this.handleUserSelect}
        />
        {selectedUser && <ManageUser user={selectedUser} badges={badges} />}
      </Fragment>
    ) : (
      <Spinner />
    )
  }
}

export default Search
