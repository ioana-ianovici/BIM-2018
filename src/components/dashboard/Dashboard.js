import React, { Component } from 'react'
import styled from 'styled-components'
import { API } from 'aws-amplify'
import { Storage } from 'aws-amplify'

import { styleConstants } from '../../shared/constants/styleConstants'
import { AppConstants } from '../../shared/constants/constants'
import Badges from './Badges'
import UserDetails from './UserDetails'
import Tree from './Tree'
import Requirements from '../../shared/Requirements'

const StyledDashboard = styled.div`
  .section-wrapper {
    display: flex;
  }
  .section-left {
    width: 60%;
    margin-right: 20px;
    padding: 18px 20px;
  }

  .section-right {
    width: 40%;
    height: 100%;
    padding: 18px 20px;
    color: ${styleConstants.mainAccent};
  }

  @media screen and (max-width: 1000px) {
    .section-wrapper {
      flex-wrap: wrap;
    }

    .section-left {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }

    .section-right {
      width: 100%;
    }
  }
`

class Dashboard extends Component {
  state = {
    userDetails: {
      // // userName: 'User name',
      // // userPicture: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-demo-7.jpg',
      // userTitle: 'user title',
      // userTitleProgressPercentage: 45,
      // userLastTitle: 'Rookie',
      // userNextTitle: 'Master',
      // userFrame: plant,
    },
    badges: [],
    requirements: [],
    tree: [],
  }

  constructor(props) {
    super(props)

    const getSelf = () => {
      API.get(AppConstants.endpoints.self, '')
        .then(response => {
          this.setState({
            userDetails: {
              userName: response.userName,
              userPicture: response.picture,
            },
            badgesList: response.badges,
            confirmedRequirements: response.confirmedRequirements || [],
            titleId: response.title,
            ladderId: response.ladder,
          })
          loadUserData()
        })
        .catch(err => {
          this.props.history.push(AppConstants.routes.settings)
        })
    }

    const loadUserData = () => {
      if (this.state.badgesList && this.state.badgesList.length) {
        let list = this.state.badgesList.toString()
        const { ladderId } = this.state

        // load badges
        API.get('Badges', `/${list}`)
          .then(badges => {
            badges.forEach(badge => {
              // todo: badge count se face dupa numarul de repetitii in lista cu badge-uri
              badge.count = 1
            })
            // load badge images
            Promise.all(
              badges
                .filter(b => b.picture)
                .map(badge =>
                  Storage.vault
                    .get(badge.picture, { level: 'public' })
                    .then(res => (badge.image = res)),
                ),
            ).then(() => {
              this.setState({ badges })
            })
          })
          .catch(err => {
            console.log(err)
          })

        // load ladder
        API.get('Ladders', `/${ladderId}`)
          .then(res => {
            this.setState({ ladder: res })
            createTree()
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

    const createTree = () => {
      const { ladder, titleId, confirmedRequirements } = this.state
      let currentPosition = ladder.steps.length
      let tree = []
      ladder.steps.map((step, index) => {
        if (step.stepId === titleId) {
          // extract current step from ladder
          currentPosition = index
          let lastTitle
          try {
            lastTitle = ladder.steps[index - 1].name
          } catch (e) {
            lastTitle = 'Unemployed'
          }
          let nextTitle
          try {
            nextTitle = ladder.steps[index + 1].name
          } catch (e) {
            nextTitle = 'Boss'
          }
          let requirements = []
          let countConfirmed = 0
          step.requirements.map(val => {
            let el = {
              id: val.id,
              text: val.text,
              isAccomplished: confirmedRequirements.indexOf(val.id) > -1,
            }
            countConfirmed += el.isAccomplished ? 1 : 0
            requirements.push(el)
          })
          this.setState({
            requirements,
            userDetails: {
              userTitleProgressPercentage: Math.ceil(
                (countConfirmed / requirements.length) * 100,
              ),
              userTitle: step.name,
              userLastTitle: lastTitle,
              userNextTitle: nextTitle,
            },
          })
        }
        let el = { title: step.name, isAchieved: currentPosition >= index }
        tree.push(el)
      })
      this.setState({ tree })
    }

    const getUser = () => {
      API.get(AppConstants.endpoints.users, `/${props.id}`).then(response => {
        this.setState({
          userDetails: {
            userName: response.userName,
            userPicture: response.picture,
          },
          badgesList: response.badges,
          confirmedRequirements: response.confirmedRequirements,
          titleId: response.title,
          ladderId: response.ladder,
        })
        loadUserData()
      })
    }

    if (props.id) {
      getUser()
    } else {
      getSelf()
    }
  }

  render() {
    const { badges, requirements, userDetails, tree } = this.state

    return (
      <StyledDashboard userProgressPercentage={45}>
        <UserDetails {...userDetails} />
        {badges && badges.length && <Badges items={badges} />}
        <div className="section-wrapper">
          <section className="section-left">
            <Tree steps={tree} />
          </section>
          <section className="section-right">
            <Requirements requirements={requirements} />
          </section>
        </div>
      </StyledDashboard>
    )
  }
}

export default Dashboard
